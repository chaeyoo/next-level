import Link from "next/link";
import "../app/global.css";
import { inter } from "@/app/ui/fonts";
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
						<div className="space-x-4">
							<Link href="/login" className="hover:text-gray-300">
								Login
							</Link>
							<Link href="/signup" className="hover:text-gray-300">
								Sign Up
							</Link>
						</div>
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
