import Editor from '../../../components/editor'

export default async function Home({ params }) {
  var res, post;
  const options = {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify({ "id": parseInt(params.slug) })
  }

  if (process.env.NODE_ENV === 'production') {
    res = await fetch('http://login-demo-arcannite.vercel.app/api/getSinglePost', options)
  }
  else {
    res = await fetch('http://localhost:3000/api/getSinglePost', options)
  }
  
  if (res.status == 200 || res.status == 201) {
    post = await res.json()
    return (
      <Editor post={post} mode='edit'/>
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