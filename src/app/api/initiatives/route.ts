import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../../auth';
import { createAuditLog } from '@/lib/audit';

const ALLOWED_ROLES = ['SUPER_ADMIN', 'CONTENT_ADMIN'];

const ALLOWED_CATEGORIES = [
  'EDUCATION',
  'CHILD_WELFARE',
  'MENTAL_WELLBEING',
  'AWARENESS',
  'DONATIONS',
  'RECREATIONAL',
  'COMMUNITY_OUTREACH',
  'HEALTHCARE',
  'OTHER',
] as const;

const ALLOWED_STATUSES = [
  'UPCOMING',
  'ONGOING',
  'COMPLETED',
  'PLANNED',
] as const;

// PUBLIC GET
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const initiatives = await prisma.initiative.findMany({
      where: {
        ...(category && category !== 'ALL'
          ? { category: category as any }
          : {}),
        ...(status && status !== 'ALL'
          ? { status: status as any }
          : {}),
      },

      select: {
        id: true,
        slug: true,
        title: true,
        category: true,
        status: true,
        shortDescription: true,
        fullDescription: true,
        location: true,
        startDate: true,
        endDate: true,
        coverImageUrl: true,
        beneficiariesCount: true,
        volunteersCount: true,
        budgetAllocated: true,
        amountSpent: true,
        featured: true,
        createdAt: true,
        updatedAt: true,
      },

      orderBy: {
        startDate: 'desc',
      },
    });

    const data = initiatives.map((initiative) => ({
      ...initiative,
      budgetAllocated: initiative.budgetAllocated.toString(),
      amountSpent: initiative.amountSpent.toString(),
    }));

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error('Initiatives fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch initiatives.',
      },
      { status: 500 }
    );
  }
}

// ADMIN CREATE
export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Forbidden',
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const title = String(body.title ?? '').trim();
    const slug = String(body.slug ?? '').trim().toLowerCase();
    const category = String(body.category ?? '').trim();
    const status = String(body.status ?? '').trim();

    const shortDescription = String(
      body.shortDescription ?? ''
    ).trim();

    const fullDescription = String(
      body.fullDescription ?? ''
    ).trim();

    const location = String(body.location ?? '').trim();

    const startDate = new Date(body.startDate);

    const endDate = body.endDate
      ? new Date(body.endDate)
      : null;

    const beneficiariesCount = Number(
      body.beneficiariesCount ?? 0
    );

    const volunteersCount = Number(
      body.volunteersCount ?? 0
    );

    const budgetAllocated = Number(
      body.budgetAllocated ?? 0
    );

    const amountSpent = Number(
      body.amountSpent ?? 0
    );

    const featured = Boolean(
      body.featured ?? false
    );

    if (!title || title.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Title is required and must be under 150 characters.',
        },
        { status: 400 }
      );
    }

    if (
      !slug ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slug.length > 150
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Slug must contain only lowercase letters, numbers, and hyphens.',
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_CATEGORIES.includes(
        category as (typeof ALLOWED_CATEGORIES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid initiative category.',
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_STATUSES.includes(
        status as (typeof ALLOWED_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid initiative status.',
        },
        { status: 400 }
      );
    }

    if (
      !shortDescription ||
      shortDescription.length > 300
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Short description is required and must be under 300 characters.',
        },
        { status: 400 }
      );
    }

    if (
      !fullDescription ||
      fullDescription.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Full description is required and must be under 5000 characters.',
        },
        { status: 400 }
      );
    }

    if (!location || location.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Location is required and must be under 200 characters.',
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(startDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid start date.',
        },
        { status: 400 }
      );
    }

    if (
      endDate &&
      (Number.isNaN(endDate.getTime()) ||
        endDate < startDate)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'End date must be valid and cannot be before the start date.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(beneficiariesCount) ||
      beneficiariesCount < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Beneficiaries count must be a non-negative integer.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(volunteersCount) ||
      volunteersCount < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Volunteers count must be a non-negative integer.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(budgetAllocated) ||
      budgetAllocated < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Budget must be a valid non-negative number.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(amountSpent) ||
      amountSpent < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Amount spent must be a valid non-negative number.',
        },
        { status: 400 }
      );
    }

    const existingInitiative =
      await prisma.initiative.findUnique({
        where: { slug },
        select: { id: true },
      });

    if (existingInitiative) {
      return NextResponse.json(
        {
          success: false,
          message:
            'An initiative with this slug already exists.',
        },
        { status: 409 }
      );
    }

    const initiative =
      await prisma.initiative.create({
        data: {
          title,
          slug,
          category:
            category as (typeof ALLOWED_CATEGORIES)[number],
          status:
            status as (typeof ALLOWED_STATUSES)[number],
          shortDescription,
          fullDescription,
          location,
          startDate,
          endDate,
          beneficiariesCount,
          volunteersCount,
          budgetAllocated,
          amountSpent,
          featured,
        },
      });

    await createAuditLog({
      action: 'CREATE',
      entity: 'Initiative',
      entityId: initiative.id,
      userId: session.user.id,
      metadata: {
        title: initiative.title,
        slug: initiative.slug,
        category: initiative.category,
        status: initiative.status,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Initiative created successfully.',
        data: {
          ...initiative,
          budgetAllocated:
            initiative.budgetAllocated.toString(),
          amountSpent:
            initiative.amountSpent.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      'Initiative creation error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create initiative.',
      },
      { status: 500 }
    );
  }
}

// ADMIN UPDATE
export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Forbidden',
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const id = String(body.id ?? '').trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Initiative ID is required.',
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.initiative.findUnique({
        where: { id },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Initiative not found.',
        },
        { status: 404 }
      );
    }

    const title = String(body.title ?? '').trim();
    const slug = String(body.slug ?? '').trim().toLowerCase();
    const category = String(body.category ?? '').trim();
    const status = String(body.status ?? '').trim();

    const shortDescription = String(
      body.shortDescription ?? ''
    ).trim();

    const fullDescription = String(
      body.fullDescription ?? ''
    ).trim();

    const location = String(body.location ?? '').trim();

    const startDate = new Date(body.startDate);

    const endDate = body.endDate
      ? new Date(body.endDate)
      : null;

    const beneficiariesCount = Number(
      body.beneficiariesCount ?? 0
    );

    const volunteersCount = Number(
      body.volunteersCount ?? 0
    );

    const budgetAllocated = Number(
      body.budgetAllocated ?? 0
    );

    const amountSpent = Number(
      body.amountSpent ??
        existing.amountSpent.toString()
    );

    const featured = Boolean(
      body.featured ?? false
    );

    if (!title || title.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Title is required and must be under 150 characters.',
        },
        { status: 400 }
      );
    }

    if (
      !slug ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slug.length > 150
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Slug must contain only lowercase letters, numbers, and hyphens.',
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_CATEGORIES.includes(
        category as (typeof ALLOWED_CATEGORIES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid initiative category.',
        },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_STATUSES.includes(
        status as (typeof ALLOWED_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid initiative status.',
        },
        { status: 400 }
      );
    }

    if (
      !shortDescription ||
      shortDescription.length > 300
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Short description is required and must be under 300 characters.',
        },
        { status: 400 }
      );
    }

    if (
      !fullDescription ||
      fullDescription.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Full description is required and must be under 5000 characters.',
        },
        { status: 400 }
      );
    }

    if (!location || location.length > 200) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Location is required and must be under 200 characters.',
        },
        { status: 400 }
      );
    }

    if (Number.isNaN(startDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid start date.',
        },
        { status: 400 }
      );
    }

    if (
      endDate &&
      (Number.isNaN(endDate.getTime()) ||
        endDate < startDate)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'End date must be valid and cannot be before the start date.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(beneficiariesCount) ||
      beneficiariesCount < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Beneficiaries count must be a non-negative integer.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isInteger(volunteersCount) ||
      volunteersCount < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Volunteers count must be a non-negative integer.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(budgetAllocated) ||
      budgetAllocated < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Budget must be a valid non-negative number.',
        },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(amountSpent) ||
      amountSpent < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Amount spent must be a valid non-negative number.',
        },
        { status: 400 }
      );
    }

    const duplicateSlug =
      await prisma.initiative.findFirst({
        where: {
          slug,
          NOT: {
            id,
          },
        },
        select: {
          id: true,
        },
      });

    if (duplicateSlug) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Another initiative already uses this slug.',
        },
        { status: 409 }
      );
    }

    const initiative =
      await prisma.initiative.update({
        where: { id },
        data: {
          title,
          slug,
          category:
            category as (typeof ALLOWED_CATEGORIES)[number],
          status:
            status as (typeof ALLOWED_STATUSES)[number],
          shortDescription,
          fullDescription,
          location,
          startDate,
          endDate,
          beneficiariesCount,
          volunteersCount,
          budgetAllocated,
          amountSpent,
          featured,
        },
      });

    await createAuditLog({
      action: 'UPDATE',
      entity: 'Initiative',
      entityId: initiative.id,
      userId: session.user.id,
      metadata: {
        title: initiative.title,
        slug: initiative.slug,
        category: initiative.category,
        status: initiative.status,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Initiative updated successfully.',
      data: {
        ...initiative,
        budgetAllocated:
          initiative.budgetAllocated.toString(),
        amountSpent:
          initiative.amountSpent.toString(),
      },
    });
  } catch (error) {
    console.error(
      'Initiative update error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update initiative.',
      },
      { status: 500 }
    );
  }
}

// ADMIN DELETE
export async function DELETE(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 }
    );
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Forbidden',
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const id = String(body.id ?? '').trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Initiative ID is required.',
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.initiative.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          slug: true,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: 'Initiative not found.',
        },
        { status: 404 }
      );
    }

    const linkedTransactions =
      await prisma.transaction.count({
        where: {
          initiativeId: id,
        },
      });

    if (linkedTransactions > 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            'This initiative cannot be deleted because transactions are linked to it.',
        },
        { status: 409 }
      );
    }

    await prisma.initiative.delete({
      where: { id },
    });

    await createAuditLog({
      action: 'DELETE',
      entity: 'Initiative',
      entityId: existing.id,
      userId: session.user.id,
      metadata: {
        title: existing.title,
        slug: existing.slug,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Initiative deleted successfully.',
    });
  } catch (error) {
    console.error(
      'Initiative deletion error:',
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete initiative.',
      },
      { status: 500 }
    );
  }
}