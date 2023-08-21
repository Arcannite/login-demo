'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { getUser } from './helpers'
import { useRouter } from 'next/navigation'

export function LoginButton() {
  return (
    <p className="
      fixed left-0 top-0 pb-6 pt-8
      flex w-full
      justify-center
      cursor-pointer
      border-b border-gray-500 bg-gradient-to-b from-zinc-100
      dark:border-neutral-500 dark:bg-zinc-800 dark:bg-gradient-to-b dark:from-zinc-900
      lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800
      hover:bg-gray-300 hover:dark:bg-zinc-700
    "
      onClick={() => signIn()}
    >
      Log in 
    </p>
  )
}

export function LogoutButton() {
  return (
    <p className="
      fixed left-0 top-0 pb-6 pt-8
      flex w-full
      justify-center
      cursor-pointer
      border-b border-gray-500 bg-gradient-to-b from-zinc-100
      dark:border-neutral-500 dark:bg-zinc-800 dark:bg-gradient-to-b dark:from-zinc-900
      lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800
      hover:bg-gray-300 hover:dark:bg-zinc-700
    "
      onClick={() => { signOut({ callbackUrl: "/" }); alert("Signed out") }}
    >
      Sign out
    </p>
  )
}

export function SaveButton({ post }) {
  return (
    <div>
      <button 
        className="float-right rounded-lg border border-sky-500 bg-sky-300 hover:bg-sky-200 p-4"
        onClick={async () => {
          if (confirm("Confirm to save changes?")) {
            const request = await fetch('http://localhost:3000/api/editPost', {
              method: 'PUT',
              headers: {
                "Content-Type": "text/plain;charset=UTF-8",
              },
              body: JSON.stringify({
                "id": post.id,
                "title": post.title,
                "content": post.content
              })
            })
            console.log(request)
          }
        }}
      >
        Save changes
      </button>
    </div>
  )
}

export function CreateButton({ post }) {
  const { data: session } = useSession()
  const router = useRouter()
  return (
    <div>
      <button 
        className="float-right rounded-lg border border-amber-400 bg-amber-200 hover:bg-amber-100 p-4"
        onClick={async () => {
          const user = await getUser(undefined, undefined, session['user']['name']) // I couldn't find a better way to do it at the moment
          
          const request = await fetch('http://localhost:3000/api/createPost', {
            method: 'POST',
            headers: {
              "Content-Type": "text/plain;charset=UTF-8",
            },
            body: JSON.stringify({
              "title": post.title,
              "content": post.content,
              "authorId": user.id
            })
          })
          // console.log(request)
          if (request.status === 200 || request.status === 201) {
            confirm("Post created")
            router.push('/dashboard')
          }
          else {
            alert("Something went wrong. Please try to create the post later.")
          }
        }}
      >
        Create post
      </button>
    </div>
  )
}

export function DeleteButton({ post }) {
  const router = useRouter()
  return (
    <div>
      <button 
        className="float-right rounded-lg border border-red-400 bg-red-200 hover:bg-red-100 p-4"
        onClick={async () => {
          if (confirm("Confirm to delete this post? This action is NOT REVERSIBLE and the data will PERMANENTLY be lost.")) {
            const request = await fetch('http://localhost:3000/api/deletePost', {
              method: 'DELETE',
              headers: {
                "Content-Type": "text/plain;charset=UTF-8",
              },
              body: JSON.stringify({
                "id": post.id,
              })
            })
            if (request.status === 200 || request.status === 201) {
              confirm("Post deleted")
              router.push('/dashboard')
            }
            else {
              alert("Something went wrong. Please try to delete the post later.")
            }
          }
        }}
      >
        Delete post
      </button>
    </div>
  )
}

export function RefButton({ innerText, href, color='gray' }) {
  return (
    <a
      className={`
        border border-` + color + `-500 bg-` + color + `-200 rounded-xl p-4
        hover:bg-` + color + `-100
      `}
      href={href}
    >
      {innerText}
    </a>
  )
}