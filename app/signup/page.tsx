import { Metadata } from "next";
import SignupForm from "../ui/signup-form";

export const metadata: Metadata = {
  title: "Signup | My Board",
  description: "Signup to participate in the community",
};
export default function SignupPage() {
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
      <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10 shadow-md">
        <SignupForm />
      </div>
    </div>
  );
}
