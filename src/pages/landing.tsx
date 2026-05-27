import {
  Link,
} from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10 px-10 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="mb-6 text-xl text-zinc-500">
              Premium LMS Platform
            </p>

            <h1 className="text-8xl font-black leading-none">
              Learn
              <br />
              Without
              Limits 🚀
            </h1>

            <p className="mt-10 max-w-2xl text-2xl text-zinc-400">
              Modern online learning
              platform with quizzes,
              certificates, analytics,
              premium memberships and
              AI-powered learning.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">
              <Link
                to="/courses"
                className="rounded-2xl bg-white px-10 py-6 text-2xl font-bold text-black transition hover:scale-[1.02]"
              >
                Explore Courses
              </Link>

              <Link
                to="/admin"
                className="rounded-2xl border border-white/10 px-10 py-6 text-2xl font-bold transition hover:bg-white hover:text-black"
              >
                Admin Panel
              </Link>
            </div>
          </div>

          <div className="mt-24 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10">
              <h2 className="text-6xl font-bold">
                10K+
              </h2>

              <p className="mt-4 text-zinc-500">
                Active Students
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10">
              <h2 className="text-6xl font-bold">
                250+
              </h2>

              <p className="mt-4 text-zinc-500">
                Premium Courses
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-zinc-950 p-10">
              <h2 className="text-6xl font-bold">
                98%
              </h2>

              <p className="mt-4 text-zinc-500">
                Completion Rate
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-10 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <p className="text-zinc-500">
              Features
            </p>

            <h2 className="mt-5 text-7xl font-bold">
              Everything You Need
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Video Learning",
              "Certificates",
              "AI Analytics",
              "Premium Courses",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-zinc-950 p-10"
              >
                <h3 className="text-3xl font-bold">
                  {item}
                </h3>

                <p className="mt-5 text-zinc-500">
                  Enterprise-level LMS
                  experience with modern
                  UX and performance.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-10 py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-zinc-500">
            Pricing
          </p>

          <h2 className="mt-5 text-7xl font-bold">
            Go Premium
          </h2>

          <div className="mt-16 rounded-[40px] border border-white/10 bg-zinc-950 p-16">
            <h3 className="text-7xl font-black">
              $29
            </h3>

            <p className="mt-3 text-zinc-500">
              per month
            </p>

            <div className="mt-12 space-y-5 text-2xl">
              <p>
                ✅ Unlimited courses
              </p>

              <p>
                ✅ Certificates
              </p>

              <p>
                ✅ Premium content
              </p>

              <p>
                ✅ AI tools
              </p>
            </div>

            <button className="mt-14 rounded-2xl bg-white px-10 py-6 text-2xl font-bold text-black">
              Upgrade Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}