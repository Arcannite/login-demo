'use client'

import { SessionProvider } from "next-auth/react"
import { SaveButton, CreateButton, RefButton, DeleteButton } from "../utils/buttons"

export default function Editor({ post, mode }) {
  const photo = {}; // this variable needs to be passed by reference

  return (
    <SessionProvider>
      <div className="min-h-screen items-center space-y-12 max-w-4xl mx-auto my-24">
        <div className="flex justify-between">
          <RefButton href={"/dashboard"} innerText={'Back to Dashboard'}/>
          {mode === 'edit' ? <DeleteButton post={post}/> : false}
        </div>

        <div className="grid grid-cols-8">
          <label className="col-span-1" htmlFor="title"> Title </label>
          <input
            className="border border-gray-400 h-10 text-xl col-span-7"
            type="text"
            name="title"
            defaultValue={post.title}
            onChange={ e => post.title = e.target.value }
          />
        </div>

        <div className="grid grid-cols-8">
          <label className="col-span-1" htmlFor="content"> Content </label>
          <textarea
            className="border border-gray-400 w-full col-span-7 h-96"
            type="text"
            name="content"
            defaultValue={post.content}
            onChange={ e => post.content = e.target.value}
          />
        </div>

        <div>
          <label className="block" htmlFor="photo"> Upload a photo for the post </label>
          <input className='block' type='file' name="photo" onChange={ e => photo["file"] = e.target.files[0] }/>
        </div>

        {mode === 'edit' ? <SaveButton post={post} photo={photo}/> : <CreateButton post={post} photo={photo}/>}

      </div>
    </SessionProvider>
  )
}