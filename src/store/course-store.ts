import { create } from "zustand"

interface Course {
  id: string
  title: string
  description: string
  image: string
  progress: number
}

interface CourseStore {
  courses: Course[]

  addCourse: (
    course: Course
  ) => void
}

export const useCourseStore =
  create<CourseStore>((set) => ({
    courses: [
      {
        id: "1",
        title: "React Masterclass",

        description:
          "Modern React development from zero to advanced.",

        image:
          "https://images.unsplash.com/photo-1633356122544-f134324a6cee",

        progress: 45,
      },

      {
        id: "2",
        title: "TypeScript Bootcamp",

        description:
          "Learn professional TypeScript development.",

        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",

        progress: 20,
      },
    ],

    addCourse: (course) =>
      set((state) => ({
        courses: [
          course,
          ...state.courses,
        ],
      })),
  }))