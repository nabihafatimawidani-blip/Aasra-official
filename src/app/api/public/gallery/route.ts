import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      select: {
        id: true,
        title: true,
        caption: true,
        imageUrl: true,
        category: true,
        eventDate: true,
        initiativeId: true,
        initiative: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        eventDate: 'desc',
      },
    });

    const data = items.map((item) => ({
      id: item.id,
      title: item.title,
      caption: item.caption,
      imageUrl: item.imageUrl,
      category: item.category,
      eventDate: item.eventDate.toISOString(),
      location: null,
      initiativeId: item.initiative?.id ?? null,
      initiativeName: item.initiative?.title ?? null,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Failed to fetch public gallery:', error);

    return NextResponse.json(
      { error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}