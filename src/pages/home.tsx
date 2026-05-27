import MainLayout from "../components/layouts/main-layout";

import AchievementCard from "../components/achievement-card";

import NotificationCard from "../components/notification-card";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-zinc-500">
              AI Learning Dashboard
            </p>

            <h1 className="mt-3 text-7xl font-black">
              Welcome Back 🚀
            </h1>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 px-8 py-5">
            <p className="text-zinc-500">
              Learning Streak
            </p>

            <h2 className="mt-2 text-5xl font-black">
              14 🔥
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Courses
            </p>

            <h2 className="mt-4 text-6xl font-black">
              24
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Completed
            </p>

            <h2 className="mt-4 text-6xl font-black">
              12
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Watch Time
            </p>

            <h2 className="mt-4 text-6xl font-black">
              48h
            </h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-8">
            <p className="text-zinc-500">
              Focus Score
            </p>

            <h2 className="mt-4 text-6xl font-black">
              92%
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-10 xl:grid-cols-[1fr_400px]">
          <div>
            <div className="rounded-[35px] border border-white/10 bg-zinc-950 p-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-500">
                    Continue Learning
                  </p>

                  <h2 className="mt-3 text-5xl font-black">
                    React Masterclass
                  </h2>
                </div>

                <a
                  href="/courses"
                  className="rounded-2xl bg-white px-8 py-5 text-xl font-bold text-black"
                >
                  Continue
                </a>
              </div>

              <div className="mt-10 h-5 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-[72%] rounded-full bg-white" />
              </div>

              <p className="mt-4 text-zinc-500">
                72% completed
              </p>
            </div>

            <div className="mt-10 rounded-[35px] border border-white/10 bg-zinc-950 p-10">
              <div className="flex items-center justify-between">
                <h2 className="text-5xl font-black">
                  AI Summary
                </h2>

                <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-bold text-black">
                  AI
                </span>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-black p-8">
                <p className="text-xl leading-relaxed text-zinc-300">
                  You are progressing
                  faster than 82% of
                  students. Your strongest
                  topic is React state
                  management. Recommended
                  next step: Advanced
                  performance optimization
                  and backend integration.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-5xl font-black">
                  Achievements
                </h2>

                <span className="text-zinc-500">
                  8 unlocked
                </span>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <AchievementCard
                  title="Fast Learner"
                  description="Completed 10 lessons in one day."
                  icon="🚀"
                />

                <AchievementCard
                  title="Quiz Master"
                  description="Passed all quizzes successfully."
                  icon="🏆"
                />

                <AchievementCard
                  title="Consistency"
                  description="7 day learning streak."
                  icon="🔥"
                />

                <AchievementCard
                  title="Premium Student"
                  description="Unlocked premium access."
                  icon="💎"
                />
              </div>
            </div>
          </div>

          <aside>
            <div className="rounded-[35px] border border-white/10 bg-zinc-950 p-10">
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-black">
                  Notifications
                </h2>

                <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black">
                  3 NEW
                </span>
              </div>

              <div className="mt-10 space-y-5">
                <NotificationCard
                  title="Certificate Ready"
                  message="Your React certificate is now available."
                />

                <NotificationCard
                  title="New Course"
                  message="Advanced Next.js course released."
                />

                <NotificationCard
                  title="Premium Offer"
                  message="Upgrade now and unlock AI tutor."
                />
              </div>
            </div>

            <div className="mt-10 rounded-[35px] border border-white/10 bg-zinc-950 p-10">
              <h2 className="text-4xl font-black">
                Leaderboard
              </h2>

              <div className="mt-10 space-y-5">
                {[
                  "Alex",
                  "Sarah",
                  "Daniel",
                  "Emma",
                ].map(
                  (
                    user,
                    index
                  ) => (
                    <div
                      key={user}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl font-black text-black">
                          {index + 1}
                        </div>

                        <h3 className="text-2xl font-bold">
                          {user}
                        </h3>
                      </div>

                      <p className="text-zinc-500">
                        {92 - index * 4}%
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}