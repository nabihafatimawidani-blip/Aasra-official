import { auth } from "../../auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAdmin();

  const userRole = session.user.role;

  if (!allowedRoles.includes(userRole)) {
  redirect("/");
}
  return session;
}