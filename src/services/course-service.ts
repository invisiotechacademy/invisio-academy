import { supabase } from "../lib/supabase";

export type Course = {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
};

export const getCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase
    .from("courses")
    .select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data || [];
};