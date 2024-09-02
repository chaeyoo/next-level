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
			<body>{children}</body>
		</html>
	);
}
