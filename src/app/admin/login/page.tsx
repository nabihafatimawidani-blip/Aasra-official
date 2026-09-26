import type { Metadata } from "next";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "../../../../auth";

export const metadata: Metadata = {
  title: "AASRA Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const error = resolvedParams?.error;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f5f0e8] px-6">
      <div className="w-full max-w-md rounded-2xl border border-[#d8c8b5] bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#4b2e1f]">
            AASRA Admin Portal
          </h1>

          <p className="mt-2 text-sm text-[#765c46]">
            Authorized personnel only
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-3 text-center text-xs font-semibold text-red-700">
            {error === "CredentialsSignin"
              ? "Invalid email or password."
              : "Authentication failed. Please verify your credentials."}
          </div>
        )}

        <form
          action={async (formData) => {
            "use server";

            try {
              await signIn("credentials", {
                email: formData.get("email"),
                password: formData.get("password"),
                redirectTo: "/admin",
              });
            } catch (err) {
              if (err instanceof AuthError) {
                redirect("/admin/login?error=CredentialsSignin");
              }
              throw err;
            }
          }}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#4b2e1f]"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#cdbba7] px-4 py-3 outline-none focus:border-[#6b452d]"
              placeholder="admin@aasra.org"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#4b2e1f]"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#cdbba7] px-4 py-3 outline-none focus:border-[#6b452d]"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#4b2e1f] px-4 py-3 font-semibold text-white transition hover:bg-[#3a2418]"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}