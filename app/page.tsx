import Logo from "@/components/ui/Logo";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <Logo />

        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}