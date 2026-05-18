import { loginAction } from "./actions";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center bg-offwhite">
      <form action={loginAction} className="bg-white border border-border rounded-xl p-8 w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-slate">Business Debt Insider Admin</h1>
        {sp.error && <p className="text-sm text-red-600">Invalid credentials</p>}
        <input name="email" type="text" autoComplete="username" placeholder="username" required className="w-full border border-border rounded-md px-3 py-2" />
        <input name="password" type="password" placeholder="password" required className="w-full border border-border rounded-md px-3 py-2" />
        <button type="submit" className="w-full bg-electric text-white py-2 rounded-md">Sign in</button>
      </form>
    </div>
  );
}
