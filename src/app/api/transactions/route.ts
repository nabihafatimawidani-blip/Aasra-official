import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '../../../../auth';
import { createAuditLog } from '@/lib/audit';

const ALLOWED_ROLES = ['SUPER_ADMIN', 'FINANCE_ADMIN'];

const ALLOWED_CATEGORIES = [
  'INDIVIDUAL_DONATION',
  'COMMUNITY_COLLECTION',
  'INSTITUTIONAL_GRANT',
  'EDUCATION_SUPPLIES',
  'NUTRITION_AND_FOOD',
  'HEALTHCARE_AND_HYGIENE',
  'LOGISTICS_AND_TRANSPORT',
  'EVENT_ORGANIZATION',
  'PRINTING_AND_MATERIALS',
  'MISCELLANEOUS',
] as const;

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    return NextResponse.json(
      { success: false, message: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type');
    const category = searchParams.get('category');
    const query = searchParams.get('q');

    const transactions = await prisma.transaction.findMany({
      where: {
        ...(type && type !== 'ALL'
          ? {
              type: type as 'INCOME' | 'EXPENSE',
            }
          : {}),

        ...(category && category !== 'ALL'
          ? {
              category: category as (typeof ALLOWED_CATEGORIES)[number],
            }
          : {}),

        ...(query
          ? {
              OR: [
                {
                  referenceId: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
                {
                  description: {
                    contains: query,
                    mode: 'insensitive',
                  },
                },
              ],
            }
          : {}),
      },

      include: {
        initiative: {
          select: {
            id: true,
            title: true,
          },
        },
      },

      orderBy: {
        date: 'desc',
      },
    });

    const data = transactions.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toString(),
      initiativeName: transaction.initiative?.title ?? null,
    }));

    return NextResponse.json({
      success: true,
      total: data.length,
      data,
    });
  } catch (error) {
    console.error('Transaction fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch transactions.',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!ALLOWED_ROLES.includes(session.user.role)) {
    return NextResponse.json(
      { success: false, message: 'Forbidden' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();

    const type = String(body.type ?? '').trim();
    const category = String(body.category ?? '').trim();
    const description = String(body.description ?? '').trim();
    const paymentMethod = String(body.paymentMethod ?? '').trim();
    const amount = Number(body.amount);
    const initiativeId = body.initiativeId
      ? String(body.initiativeId).trim()
      : null;
if (initiativeId) {
  const initiative = await prisma.initiative.findUnique({
    where: { id: initiativeId },
    select: { id: true },
  });

  if (!initiative) {
    return NextResponse.json(
      {
        success: false,
        message: 'Selected initiative does not exist.',
      },
      { status: 400 }
    );
  }
}
    // Basic validation
    if (!['INCOME', 'EXPENSE'].includes(type)) {
      return NextResponse.json(
        { success: false, message: 'Invalid transaction type.' },
        { status: 400 }
      );
    }

    if (
      !ALLOWED_CATEGORIES.includes(
        category as (typeof ALLOWED_CATEGORIES)[number]
      )
    ) {
      return NextResponse.json(
        { success: false, message: 'Invalid transaction category.' },
        { status: 400 }
      );
    }

    if (!description || description.length > 500) {
      return NextResponse.json(
        {
          success: false,
          message: 'Description is required and must be under 500 characters.',
        },
        { status: 400 }
      );
    }

    if (!paymentMethod || paymentMethod.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Payment method is required and must be under 100 characters.',
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Amount must be a valid number greater than zero.',
        },
        { status: 400 }
      );
    }

    // Verify linked initiative exists
   // if (initiativeId) {
     // const initiative = await prisma.initiative.findUnique({
      //  where: {
        //  id: initiativeId,
        /*},
        select: {
          id: true,
        },
      });

      if (!initiative) {
        return NextResponse.json(
          {
            success: false,
            message: 'Selected initiative does not exist.',
          },
          { status: 400 }
        );
      }
    }*/

    // Generate a unique transaction reference
    const referenceId = `AASRA-TX-${new Date().getFullYear()}-${Date.now()}`;

    const transaction = await prisma.transaction.create({
      data: {
        referenceId,
        date: new Date(),
        type: type as 'INCOME' | 'EXPENSE',
        category:
          category as (typeof ALLOWED_CATEGORIES)[number],
        description,
        amount,
        paymentMethod,
        status: 'VERIFIED',
        initiativeId,
      },

      include: {
        initiative: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    // Record who created the transaction
    await createAuditLog({
      action: 'CREATE',
      entity: 'Transaction',
      entityId: transaction.id,
      userId: session.user.id,
      metadata: {
        referenceId: transaction.referenceId,
        type: transaction.type,
        category: transaction.category,
        amount: transaction.amount.toString(),
        initiativeId: transaction.initiativeId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Transaction recorded successfully.',
        data: {
          ...transaction,
          amount: transaction.amount.toString(),
          initiativeName: transaction.initiative?.title ?? null,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Transaction creation error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create transaction.',
      },
      { status: 500 }
    );
  }
}