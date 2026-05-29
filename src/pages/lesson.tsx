import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getLessons } from "../services/lesson-service";

import LessonSidebar from "../components/lesson-sidebar";
import VideoPlayer from "../components/video-player";

export default function LessonPage() {
  const { id } = useParams();

  const [lessons, setLessons] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] =
    useState<any>(null);

  useEffect(() => {
    loadLessons();
  }, []);

  async function loadLessons() {
    try {
      const data = await getLessons(Number(id));

      setLessons(data);

      if (data.length > 0) {
        setCurrentLesson(data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="flex bg-black min-h-screen">
      <LessonSidebar
        lessons={lessons}
        currentLesson={currentLesson}
        setCurrentLesson={setCurrentLesson}
      />

      <div className="flex-1 p-8">
        {currentLesson && (
          <>
            <VideoPlayer
              videoUrl={currentLesson.video_url}
            />

            <div className="mt-6">
              <h1 className="text-4xl text-white font-bold">
                {currentLesson.title}
              </h1>

              <p className="text-zinc-400 mt-4 text-lg">
                AI supported learning lesson.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}