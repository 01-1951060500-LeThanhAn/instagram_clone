import FollowersModal from "@/components/modal/modal-followers";
import { fetchProfile } from "@/lib/data";

async function FollowersPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const profile = await fetchProfile(id);
  const followers = profile?.followedBy;

  return <FollowersModal followers={followers} username={id} />;
}

export default FollowersPage;
