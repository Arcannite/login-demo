import Editor from '../../../components/editor'
import { autoFetch } from '@/app/utils/helpers';

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