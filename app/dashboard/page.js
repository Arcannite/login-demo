import PostList from "../components/postList";
import { autoFetch } from "../utils/helpers";

export default async function Home() {
  var posts;
  const res = await autoFetch('/api/getAllPosts')
  
  if (res.status == 200 || res.status == 201) {
    const postsJSON = await res.json()
    posts = []
    for (const id in postsJSON) {
      posts.push(postsJSON[id])
    }
  }

  return ( <PostList posts={posts}/> )
}
