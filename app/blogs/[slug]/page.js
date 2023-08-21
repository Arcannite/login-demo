import { getUser, autoFetch } from "@/app/utils/helpers";
import { RefButton } from "@/app/utils/buttons";

export default async function Home({ params }) {
  var res, post;
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify({ "id": parseInt(params.slug) })
  }

  res = await autoFetch('/api/getSinglePost', options)
  
  if (res.status == 200 || res.status == 201) {
    post = await res.json()
    const username = await getUser(post.authorId).then(user => user['username'])
    return (
      <div className="min-h-screen items-center space-y-12 max-w-4xl mx-auto my-24">
        <div className="flex justify-between">
          <RefButton href={"/dashboard"} innerText={'Back to Dashboard'}/>
          <RefButton href={"/dashboard/editPost/" + post.id} innerText={'Edit this post'}/>
        </div>
        <div className="space-y-6">
          <div className="text-2xl font-semibold"> {post.title} </div>
          <div> {username} </div>
          <div> {post.content} </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="min-h-screen items-center space-y-3 p-24">
        <div className="font-semibold text-lg"> Article not found </div>
      </div>
    )
  }
}