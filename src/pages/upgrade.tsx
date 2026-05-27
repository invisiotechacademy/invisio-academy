import MainLayout from "../components/layouts/main-layout";

import {
  stripePromise,
} from "../lib/stripe";

export default function UpgradePage() {
  async function handleCheckout() {
    const stripe =
      await stripePromise;

    if (!stripe) return;

    window.location.href =
      "https://buy.stripe.com/test";
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[40px] border border-white/10 bg-zinc-950 p-14">
            <div className="text-center">
              <p className="text-zinc-500">
                PREMIUM MEMBERSHIP
              </p>

              <h1 className="mt-5 text-8xl font-black">
                Upgrade 🚀
              </h1>

              <p className="mx-auto mt-8 max-w-3xl text-2xl text-zinc-400">
                Unlock all premium
                courses, AI tutor,
                certificates, analytics
                and advanced features.
              </p>
            </div>

            <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-black p-8">
                <div className="text-5xl">
                  🚀
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  Unlimited Courses
                </h2>

                <p className="mt-4 text-zinc-500">
                  Access all premium
                  lessons instantly.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black p-8">
                <div className="text-5xl">
                  🤖
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  AI Tutor
                </h2>

                <p className="mt-4 text-zinc-500">
                  Learn faster with
                  ChatGPT-powered help.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black p-8">
                <div className="text-5xl">
                  🏆
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  Certificates
                </h2>

                <p className="mt-4 text-zinc-500">
                  Download verified
                  certificates.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black p-8">
                <div className="text-5xl">
                  📈
                </div>

                <h2 className="mt-6 text-3xl font-black">
                  Analytics
                </h2>

                <p className="mt-4 text-zinc-500">
                  Track your learning
                  progress.
                </p>
              </div>
            </div>

            <div className="mt-20 rounded-[40px] border border-white/10 bg-black p-14 text-center">
              <p className="text-zinc-500">
                PREMIUM PLAN
              </p>

              <h2 className="mt-6 text-8xl font-black">
                $29
              </h2>

              <p className="mt-3 text-2xl text-zinc-500">
                monthly subscription
              </p>

              <button
                onClick={
                  handleCheckout
                }
                className="mt-12 rounded-2xl bg-white px-12 py-6 text-2xl font-bold text-black transition hover:scale-[1.02]"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}