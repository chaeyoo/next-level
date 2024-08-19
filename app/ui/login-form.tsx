"use client";
import { Button } from "./button";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/action";

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <form action={formAction} className="space-y-4 w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700 mb-1"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          id="password"
          type="password"
          name="password"
          placeholder="Enter password"
          required
          minLength={6}
        />
      </div>
      <Button
        className="w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-disabled={isPending}
      >
        Log in
      </Button>
      {errorMessage && (
        <p className="text-sm text-red-600 text-center">{errorMessage}</p>
      )}
    </form>
  );
}
