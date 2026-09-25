import { prisma } from '@/lib/prisma';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

export async function checkRateLimit(key: string) {
  const now = new Date();

  const existing = await prisma.apiRateLimit.findUnique({
    where: { key },
  });

  if (!existing) {
    await prisma.apiRateLimit.create({
      data: {
        key,
        windowStart: now,
        requestCount: 1,
      },
    });

    return true;
  }

  const elapsed =
    now.getTime() - existing.windowStart.getTime();

  if (elapsed >= WINDOW_MS) {
    await prisma.apiRateLimit.update({
      where: { key },
      data: {
        windowStart: now,
        requestCount: 1,
      },
    });

    return true;
  }

  if (existing.requestCount >= MAX_REQUESTS) {
    return false;
  }

  await prisma.apiRateLimit.update({
    where: { key },
    data: {
      requestCount: {
        increment: 1,
      },
    },
  });

  return true;
}