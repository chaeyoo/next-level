import Link from "next/link";
import "../app/global.css";
import { signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<header className="">
					<nav className="container mx-auto px-4 py-4 flex justify-between items-center">
						<Link href="/" className="text-2xl font-bold">
							My Board
						</Link>
						<form
							action={async () => {
								"use server";
								await signOut();
							}}
						>
							<button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-blue-100 hover:text-slate-600 md:flex-none md:justify-start md:p-2 md:px-3">
								<PowerIcon className="w-6" />
								<div className="hidden md:block">로그아웃</div>
							</button>
						</form>
					</nav>
				</header>
				<main className="container mx-auto px-4 py-8">{children}</main>
				<footer className="bg-navy-600 text-white py-4">
					<div className="container mx-auto px-4 text-center">
						© 2024 My Board. All rights reserved.
					</div>
				</footer>
			</body>
		</html>
	);
}
