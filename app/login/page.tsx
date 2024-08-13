import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
        <div className="mt-5 flex flex-col">
          TEST 계정
          <div>email: user@nextmail.com</div>
          <div>pwd: 123456</div>
        </div>
      </div>
    </main>
  );
}
