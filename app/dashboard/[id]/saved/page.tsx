import PostsGrid from "@/components/posts/post-grid";
import { fetchSavedPostsByUsername } from "@/lib/data";

async function SavedPosts({ params: { id } }: { params: { id: string } }) {
  const savedPosts = await fetchSavedPostsByUsername(id);
  const posts = savedPosts?.map((savedPost) => savedPost.post);

  return <PostsGrid posts={posts} />;
}

export default SavedPosts;
