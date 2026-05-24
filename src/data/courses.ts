import { Course } from "../types/course"

export const courses: Course[] = [
  {
    id: 1,
    title: "Embedded Systems Engineering",
    category: "Electronics",
    instructor: "INVISIO",
    price: 199,
    students: 124,
    published: true,
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },

  {
    id: 2,
    title: "Drone Flight Systems",
    category: "Aviation",
    instructor: "INVISIO",
    price: 249,
    students: 89,
    published: true,
    thumbnail:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f",
  },

  {
    id: 3,
    title: "PCB Design Masterclass",
    category: "Hardware",
    instructor: "INVISIO",
    price: 149,
    students: 212,
    published: false,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
]