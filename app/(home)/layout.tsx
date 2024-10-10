"use client";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await signOut();
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			setIsLoggingOut(false);
		}
	};
	return (
		<>
			<header className="">
				<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
					<Link href="/" className="text-2xl font-bold">
						My Board
					</Link>
					<div>
						{isLoggingOut ? (
							<>
								<Image
									src="/loading.gif"
									alt="로그아웃 중"
									width={24}
									height={24}
									unoptimized
								/>
							</>
						) : (
							<button
								className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-blue-100 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3"
								onClick={handleLogout}
								disabled={isLoggingOut}
							>
								<PowerIcon className="w-6" />
								<div className="hidden md:block">로그아웃</div>
							</button>
						)}
					</div>
				</nav>
			</header>
			<main className="container mx-auto px-4 py-8">{children}</main>
			<footer className="bg-navy-600 text-white py-4">
				<div className="container mx-auto px-4 text-center">
					© 2024 My Board. All rights reserved.
				</div>
			</footer>
		</>
	);
}
