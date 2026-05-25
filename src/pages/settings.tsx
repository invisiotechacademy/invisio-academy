export default function SettingsPage() {
  return (
    <div className="max-w-3xl text-white">
      <div className="mb-10">
        <h1 className="text-5xl font-bold">
          Settings
        </h1>

        <p className="mt-4 text-zinc-500">
          Manage your account preferences
        </p>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold">
            Profile
          </h2>

          <div className="mt-6 grid gap-4">
            <input
              placeholder="Full Name"
              className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <input
              placeholder="Email"
              className="rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none"
            />

            <button className="mt-4 rounded-2xl bg-white py-4 font-semibold text-black">
              Save Changes
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-zinc-900 p-8">
          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black p-5">
            <div>
              <p className="font-semibold">
                Email Notifications
              </p>

              <p className="mt-1 text-sm text-zinc-500">
                Receive course updates
              </p>
            </div>

            <div className="h-7 w-14 rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}