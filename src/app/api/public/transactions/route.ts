import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        status: "VERIFIED",
      },
      select: {
        id: true,
        referenceId: true,
        date: true,
        type: true,
        category: true,
        description: true,
        amount: true,
        paymentMethod: true,
        status: true,
        initiative: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    const data = transactions.map((tx) => ({
      id: tx.id,
      referenceId: tx.referenceId,
      date: tx.date.toISOString(),
      type: tx.type,
      category: tx.category,
      description: tx.description,
      amount: Number(tx.amount),
      paymentMethod: tx.paymentMethod,
      status: tx.status,
      initiativeId: tx.initiative?.id ?? null,
      initiativeName: tx.initiative?.title ?? null,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Failed to fetch public transactions:", error);

    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}