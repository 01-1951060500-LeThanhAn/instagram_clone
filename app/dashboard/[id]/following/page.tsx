import FollowingModal from "@/components/modal/modal-followings";
import { fetchProfile } from "@/lib/data";

async function FollowingPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const profile = await fetchProfile(id);
  const following = profile?.following;

  return <FollowingModal following={following} username={id} />;
}

export default FollowingPage;
