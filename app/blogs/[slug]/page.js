import { getUser, autoFetch } from "@/app/utils/helpers";
import { RefButton } from "@/app/utils/buttons";
import Image from "next/image";

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
    let photoURL = null;
    if (post.photoUrl.length > 0) {
      // the return body is a readableStream object
      // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream

      photoURL = await fetch("https://" + process.env.NEXT_PUBLIC_S3_BUCKET
        + ".execute-api." + process.env.NEXT_PUBLIC_BUCKET_REGION
        + ".amazonaws.com/v1/" + process.env.NEXT_PUBLIC_BUCKET_NAME + '/' + post.photoUrl)
        .then((response) => response.body)
        .then((rb) => {
          const reader = rb.getReader(); 
      
          return new ReadableStream({
            start(controller) {
              // The following function handles each data chunk
              function push() {
                // "done" is a Boolean and value a "Uint8Array"
                reader.read().then(({ done, value }) => {
                  // If there is no more data to read
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Get the data and send it to the browser via the controller
                  controller.enqueue(value);
                  // Check chunks by logging to the console
                  push();
                });
              }
      
              push();
            },
          });
        })
        .then((stream) =>
          // Respond with our stream
          new Response(stream, { headers: { "Content-Type": "image/html;charset=ISO-8859-1" } }).blob(),
        )
        .then((result) => {
          // Do things with result
          return URL.createObjectURL(result);
        });
    }

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
          <div> {(photoURL === null ? false : <Image width={512} height={512} src={photoURL} alt="Photo attached to the post"/> )} </div>
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