"use client";
import { useActionState } from "react";
import { createUser, State } from "../lib/signup/action";

export default function SignupForm() {
	const initialState: State = { message: null, errors: {} };
	const [state, formAction] = useActionState<State, FormData>(
		createUser,
		initialState
	);

	return (
		<form action={formAction} className="space-y-4 w-full max-w-sm mx-auto">
			<h1 className="text-2xl font-bold mb-6 text-center text-slate-800">
				회원가입
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
				{state.errors?.email && (
					<p className="mt-1 text-red-500 text-sm">{state.errors.email[0]}</p>
				)}
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
				{state.errors?.password && (
					<p className="mt-1 text-red-500 text-sm">
						{state.errors.password[0]}
					</p>
				)}
			</div>

			<div>
				<label
					className="block text-sm font-medium text-slate-700 mb-1"
					htmlFor="password-confirm"
				>
					Password Confirm
				</label>
				<input
					className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
					id="password-confirm"
					type="password"
					name="password-confirm"
					placeholder="Enter password again"
					required
					minLength={6}
				/>
				{state.errors?.passwordConfirm && (
					<p className="mt-1 text-red-500 text-sm">
						{state.errors.passwordConfirm[0]}
					</p>
				)}
			</div>

			<div>
				<label
					className="block text-sm font-medium text-slate-700 mb-1"
					htmlFor="nickname"
				>
					Nickname
				</label>
				<input
					className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
					id="nickname"
					type="text"
					name="nickname"
					placeholder="Enter your nickname"
					required
				/>
				{state.errors?.nickname && (
					<p className="mt-1 text-red-500 text-sm">
						{state.errors.nickname[0]}
					</p>
				)}
			</div>
			<button className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50">
				가입
			</button>
			{state.message && (
				<p className="mt-4 text-red-500 text-sm text-center">{state.message}</p>
			)}
		</form>
	);
}
