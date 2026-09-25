import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type AuditLogInput = {
  action: string;
  entity: string;
  entityId: string;
  userId?: string;
  metadata?: Prisma.InputJsonValue;
};

export async function createAuditLog({
  action,
  entity,
  entityId,
  userId,
  metadata,
}: AuditLogInput) {
  await prisma.auditLog.create({
    data: {
      action,
      entity,
      entityId,
      userId,
      metadata,
    },
  });
}