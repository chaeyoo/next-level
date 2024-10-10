import { Metadata } from "next";
import LoginForm from "../ui/login-form";

export const metadata: Metadata = {
	title: "Login | My Board",
	description: "Login to access your account",
};
export default function LoginPage() {
	return (
		<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
			<div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow-md">
				<LoginForm />
			</div>
			<div className="mt-6 text-center text-sm text-gray-600">
				<p className="font-semibold">Test Account</p>
				<p>Email: test3@email.com</p>
				<p>Password: 123456</p>
			</div>
		</div>
	);
}
