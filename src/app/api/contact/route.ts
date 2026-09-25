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
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error('Contact messages fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch contact messages.',
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

    const allowed = await checkRateLimit(`contact:${ip}`);

    if (!allowed) {
      return NextResponse.json(
        {
          error:
            'Too many inquiries submitted. Please try again later.',
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim().toLowerCase();
    const subject = String(body.subject ?? '').trim();
    const message = String(body.message ?? '').trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    if (name.length > 100) {
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

    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject is too long.' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long.' },
        { status: 400 }
      );
    }

    const savedMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Message delivered to student secretariat successfully.',
      data: savedMessage,
    });
  } catch (error) {
    console.error('Contact submission error:', error);

    return NextResponse.json(
      { error: 'Failed to process inquiry submission.' },
      { status: 500 }
    );
  }
}