type DashboardProps = {
  username: string;
};

export default function Dashboard({ username }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          Halo, {username} 👋
        </h2>

        <p className="text-gray-500">
          Selamat datang di FlashPeace.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">
          📚 Your Decks
        </h3>

        <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">
            Belum ada deck.
          </p>

          <p className="text-sm text-gray-400">
            Mulai buat deck pertamamu!
          </p>
        </div>
      </div>
    </div>
  );
}