import { supabase } from "../lib/supabase";

export async function getLessons(courseId: number) {
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("course_id", courseId)
    .order("id");

  if (error) throw error;

  return data;
}