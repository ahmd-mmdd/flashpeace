export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-bold">FlashPeace</h1>

        <p className="mt-2 text-center text-sm text-gray-500">
          Learn vocabulary peacefully.
        </p>

        <div className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700">
            Login
          </button>

          <button className="w-full rounded-xl border border-gray-300 py-3 font-semibold hover:bg-gray-100">
            Continue as Guest
          </button>
        </div>
      </div>
    </main>
  );
}