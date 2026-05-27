import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../components/layouts/main-layout";
import { supabase } from "../lib/supabase";

export default function SettingsPage() {
  const [loading, setLoading] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [avatar, setAvatar] =
    useState<File | null>(null);

  const [avatarUrl, setAvatarUrl] =
    useState("");

  useEffect(() => {
    getProfile();
  }, []);

  async function getProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
      console.log(error);
      return;
    }

    if (data) {
      setUsername(
        data.username || ""
      );

      setBio(data.bio || "");

      setAvatarUrl(
        data.avatar_url || ""
      );
    }
  }

  async function uploadAvatar() {
    if (!avatar) return avatarUrl;

    const fileExt =
      avatar.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${fileExt}`;

    const { error } =
      await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (error) {
      console.log(error);

      toast.error(
        "Avatar upload failed ❌"
      );

      return avatarUrl;
    }

    const { data } =
      supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function updateProfile(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const uploadedAvatar =
      await uploadAvatar();

    const { error } =
      await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username,
          bio,
          avatar_url:
            uploadedAvatar,
        });

    setLoading(false);

    if (error) {
      console.log(error);

      toast.error(
        "Update failed ❌"
      );

      return;
    }

    toast.success(
      "Profile updated 🚀"
    );

    getProfile();
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-black p-10 text-white">
        <div className="mb-10">
          <h1 className="text-6xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-zinc-500">
            Manage your profile
          </p>
        </div>

        <div className="max-w-3xl rounded-3xl border border-white/10 bg-zinc-950 p-8">
          <form
            onSubmit={updateProfile}
            className="space-y-6"
          >
            <div className="flex items-center gap-5">
              <img
                src={
                  avatarUrl ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="avatar"
                className="h-24 w-24 rounded-full object-cover"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setAvatar(
                    e.target
                      .files?.[0] ||
                      null
                  )
                }
              />
            </div>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
            />

            <textarea
              placeholder="Bio"
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
              className="h-40 w-full rounded-2xl border border-white/10 bg-black px-5 py-4 outline-none"
            />

            <button className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-black">
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}