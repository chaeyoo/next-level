"use client";

import { useActionState, useEffect, useState } from "react";
import { authenticate } from "@/app/lib/action";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
	const [errorMessage, formAction, isPending] = useActionState(
		authenticate,
		undefined
	);

	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (!isPending && isSubmitting) {
			setIsSubmitting(false);
		}
	}, [isPending, isSubmitting]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		setIsSubmitting(true);
	};

	return (
		<form
			onSubmit={handleSubmit}
			action={formAction}
			className="space-y-4 w-full max-w-sm mx-auto"
		>
			<h1 className="text-2xl font-bold mb-6 text-center text-slate-800">
				로그인
			</h1>
			<div>
				<label
					className="block text-sm font-medium text-slate-700 mb-1"
					htmlFor="email"
				>
					이메일
				</label>
				<input
					className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
					id="email"
					type="email"
					name="email"
					placeholder="이메일"
					required
				/>
			</div>
			<div>
				<label
					className="block text-sm font-medium text-slate-700 mb-1"
					htmlFor="password"
				>
					비밀번호
				</label>
				<input
					className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-slate-500 focus:border-slate-500"
					id="password"
					type="password"
					name="password"
					placeholder="비밀번호"
					required
					minLength={6}
				/>
			</div>

			{isSubmitting ? (
				<div className="flex justify-center">
					<Image
						src="/loading.gif"
						alt="로딩 중"
						width={24}
						height={24}
						className="mr-2"
					/>
				</div>
			) : (
				<button
					className={`w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 flex items-center justify-center transition-all duration-300`}
				>
					로그인
				</button>
			)}

			<Link
				href={"/signup"}
				className="block text-center w-full bg-white border border-slate-200 text-slate-800 py-2 px-4 rounded-md hover:bg-slate-100 focus:outline-none  cursor-pointer"
			>
				회원가입
			</Link>
			{errorMessage && (
				<p className="text-sm text-red-600 text-center">{errorMessage}</p>
			)}
		</form>
	);
}
