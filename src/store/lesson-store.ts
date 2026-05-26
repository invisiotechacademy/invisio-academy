import { create } from "zustand"

import {
  persist,
} from "zustand/middleware"

interface Lesson {
  id: string
  courseId: string
  title: string
  duration: string
  video_url: string
}

interface LessonStore {
  lessons: Lesson[]

  addLesson: (
    lesson: Lesson
  ) => void
}

export const useLessonStore =
  create<LessonStore>()(
    persist(
      (set) => ({
        lessons: [
          {
            id: "1",

            courseId: "1",

            title:
              "Introduction",

            duration:
              "12 min",

            video_url:
              "https://www.youtube.com/embed/dGcsHMXbSOA",
          },

          {
            id: "2",

            courseId: "1",

            title:
              "Components",

            duration:
              "18 min",

            video_url:
              "https://www.youtube.com/embed/w7ejDZ8SWv8",
          },
        ],

        addLesson: (
          lesson
        ) =>
          set((state) => ({
            lessons: [
              ...state.lessons,
              lesson,
            ],
          })),
      }),

      {
        name:
          "invisio-lesson-storage",
      }
    )
  )