import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Switch } from "@/components/ui/switch"

import { Course } from "@/types/course"

export default function CreateCourseModal({
  onCreate,
}: {
  onCreate: (course: Course) => void
}) {
  const [title, setTitle] = useState("")

  const [description, setDescription] =
    useState("")

  const [category, setCategory] =
    useState("Engineering")

  const [price, setPrice] = useState(199)

  const [published, setPublished] =
    useState(false)

  function handleCreateCourse() {
    const newCourse ={
     

      title,

      category,

      instructor: "INVISIO",

      price,

      students: 0,

      published,

      thumbnail:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    }

    onCreate(newCourse)

    setTitle("")
    setDescription("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90">
          Add Course
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl border-zinc-800 bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>
            Create Course
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label>
              Course Title
            </Label>

            <Input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="Embedded Systems"
              className="border-zinc-800 bg-zinc-900"
            />
          </div>

          <div className="space-y-2">
            <Label>
              Description
            </Label>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Course description..."
              className="min-h-32 border-zinc-800 bg-zinc-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>
                Category
              </Label>

              <Select
                onValueChange={setCategory}
              >
                <SelectTrigger className="border-zinc-800 bg-zinc-900">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent className="border-zinc-800 bg-zinc-900 text-white">
                  <SelectItem value="Engineering">
                    Engineering
                  </SelectItem>

                  <SelectItem value="Aviation">
                    Aviation
                  </SelectItem>

                  <SelectItem value="Electronics">
                    Electronics
                  </SelectItem>

                  <SelectItem value="Software">
                    Software
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                Price
              </Label>

              <Input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(Number(e.target.value))
                }
                className="border-zinc-800 bg-zinc-900"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
            <div>
              <h3 className="font-medium">
                Publish Course
              </h3>

              <p className="text-sm text-zinc-400">
                Make course publicly available
              </p>
            </div>

            <Switch
              checked={published}
              onCheckedChange={setPublished}
            />
          </div>

          <button
            onClick={handleCreateCourse}
            className="w-full rounded-xl bg-white py-3 font-medium text-black transition hover:opacity-90"
          >
            Create Course
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}