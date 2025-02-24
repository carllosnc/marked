import { GoogleSignIn } from "@/components/google-button";
import { getAuth } from "@clerk/react-router/ssr.server";
import { NavLink, redirect } from "react-router";
import type { Route } from "./+types/sign-in"
import { LogoHorizontal } from "@/components/logo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
  ];
}

export async function loader(args: any) {
  const auth = await getAuth(args)
  if (auth.sessionId) {
    return redirect('/dashboard')
  }
}

export default function SignIn() {
  return (
    <main className="min-h-screen flex flex-col gap-[30px] items-center justify-center p-6">
      <div className="w-full shadow-md shadow-neutral-200 max-w-[400px] bg-white border border-neutral-300 gap-[20px] flex-col rounded-lg px-6 py-[60px] flex justify-center items-center">

        <LogoHorizontal className="w-[200px] h-auto fill-neutral-950 dark:fill-white" />

        <div className="flex flex-col items-center gap-[10px]">
          <span className="text-color"> Do login to continue </span>
        </div>

        <GoogleSignIn />
      </div>

      <NavLink to="/" className="link-color hover:underline">
        Back to home →
      </NavLink>
    </main>
  );
}