import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <LoginForm />
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="font-semibold">Test Account</p>
          <p>Email: user@nextmail.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </main>
  );
}
