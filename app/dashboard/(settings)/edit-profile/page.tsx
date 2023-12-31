import { auth } from "@/auth/options";
import ProfileForm from "@/components/profile/profile-form";
import { fetchProfile } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile() {
  const session = await auth();
  const profile = await fetchProfile(session?.user.id!);

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit profile</h1>

      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
