import { checkRateLimit } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../../auth';

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (
    session.user.role !== 'SUPER_ADMIN' &&
    session.user.role !== 'OUTREACH_ADMIN'
  ) {
    return NextResponse.json(
      { success: false, message: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    const applications = await prisma.volunteerApplication.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error('Volunteer applications fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch volunteer applications.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip =
      forwardedFor?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const allowed = await checkRateLimit(`volunteer:${ip}`);

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            'Too many applications submitted. Please try again later.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const fullName = String(body.fullName ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const phone = String(body.phone ?? '').trim();
    const collegeDept = String(
      body.collegeDept ?? 'General Studies'
    ).trim();
    const academicYear = String(
      body.academicYear ?? '1st Year'
    ).trim();
    const interests = Array.isArray(body.interests)
      ? body.interests
      : [];
    const availability = String(
      body.availability ?? 'Weekends'
    ).trim();
    const statement = String(body.statement ?? '').trim();

    if (!fullName || !email || !phone || !statement) {
      return NextResponse.json(
        {
          error:
            'Name, email, phone, and statement are required fields.',
        },
        { status: 400 }
      );
    }

    if (fullName.length > 100) {
      return NextResponse.json(
        { error: 'Name is too long.' },
        { status: 400 }
      );
    }

    if (
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (
      phone.length > 20 ||
      !/^[0-9+\-\s()]+$/.test(phone)
    ) {
      return NextResponse.json(
        { error: 'Please provide a valid phone number.' },
        { status: 400 }
      );
    }

    if (statement.length > 5000) {
      return NextResponse.json(
        { error: 'Statement is too long.' },
        { status: 400 }
      );
    }

    if (interests.length > 20) {
      return NextResponse.json(
        { error: 'Too many interests provided.' },
        { status: 400 }
      );
    }

    const application = await prisma.volunteerApplication.create({
      data: {
        fullName,
        email,
        phone,
        collegeDept,
        academicYear,
        interests,
        availability,
        statement,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Volunteer application submitted successfully.',
      data: application,
    });
  } catch (error) {
    console.error('Volunteer application error:', error);

    return NextResponse.json(
      { error: 'Failed to process application request.' },
      { status: 500 }
    );
  }
}
export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (
    session.user.role !== 'SUPER_ADMIN' &&
    session.user.role !== 'OUTREACH_ADMIN'
  ) {
    return NextResponse.json(
      { success: false, message: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const id = String(body.id ?? '').trim();
    const status = String(body.status ?? '').trim();

    const allowedStatuses = [
      'PENDING',
      'UNDER_REVIEW',
      'ACCEPTED',
      'REJECTED',
    ];

    if (!id || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid application ID or status.' },
        { status: 400 }
      );
    }

    const updatedApplication =
      await prisma.volunteerApplication.update({
        where: { id },
        data: {
          status: status as
            | 'PENDING'
            | 'UNDER_REVIEW'
            | 'ACCEPTED'
            | 'REJECTED',
        },
      });

    return NextResponse.json({
      success: true,
      message: 'Volunteer application status updated.',
      data: updatedApplication,
    });
  } catch (error) {
    console.error('Volunteer status update error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update volunteer application.',
      },
      { status: 500 }
    );
  }
}