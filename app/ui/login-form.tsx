"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/action";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4 w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">
        Login
      </h1>
      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-slate-700 mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
          minLength={6}
        />
      </div>
      <button
        className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
        aria-disabled={isPending}
      >
        로그인
      </button>
      {errorMessage && (
        <p className="text-sm text-red-600 text-center">{errorMessage}</p>
      )}
    </form>
  );
}
