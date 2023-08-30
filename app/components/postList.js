'use client'

import { useState } from "react"

import { LogoutButton, RefButton } from '../utils/buttons'
import { parseDateTime, autoFetch, getUser } from '../utils/helpers'
import { redirect } from "next/navigation"

function Navbar() {
  return (
    <div className="z-10 max-w-6xl w-full items-center justify-between font-mono text-sm lg:flex mx-auto">
      <LogoutButton></LogoutButton>
      <RefButton href="/" innerText={"Back to home"}/>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <a
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Company logo
        </a>
      </div>
    </div>
  )
}

export default function PostList({ posts }) {
  const [ deleteModeActive, toggleDeleteModeActive ] = useState(false)
  
  if (Object.prototype.toString.call(posts) !== '[object Array]' || posts.length === 0) {
    return (
      <main className="flex min-h-screen flex-col space-y-12 px-24 py-20">
        <Navbar/>
        <div className="pl-72"> There are currently no posts. </div>
      </main>
    )
  }

  let postsToDelete = {}; // {"post1ID": "post1Title", "post2ID": "post2Title", ...}

  return (
    <main className="flex min-h-screen flex-col space-y-12 px-24 py-20">

      <Navbar/>

      <div className='mx-56'>
        <div className="pb-8 flex justify-between items-center">
          <div className="text-2xl font-semibold"> Posts </div>
          <RefButton href={'/dashboard/createPost'} innerText={'Create Post'} color={'amber'}/>
          <button
            className={"border rounded-lg p-4"
              + (deleteModeActive ? ' border-blue-400 bg-sky-200 hover:bg-blue-100' : ' border-red-400 bg-red-300 hover:bg-red-200')}
            onClick={() => toggleDeleteModeActive( mode => !mode )}
          >
            {deleteModeActive ? 'Delete Mode Off' : 'Delete Mode On'}
          </button>
        </div>
        
        <div className='grid grid-cols-12 border-r border-gray-500'> 
          <div className='p-4 border-l border-t border-gray-500 col-span-1'>Author</div>
          <div className='p-4 border-l border-t border-gray-500 col-span-2'>Time posted</div>
          <div className='p-4 border-l border-t border-gray-500 col-span-2'>Last modified</div>
          
          <div className={
            'p-4 border-l border-t border-gray-500' + (deleteModeActive ? ' col-span-6' : ' col-span-7')
          }>
            Title
          </div> 

          <div className={
            'p-4 border-l border-t border-gray-500' + (deleteModeActive ? ' col-span-1' : ' hidden')
          }>
            Delete
          </div>

        </div>
        {
          posts.map( async (post) => (
            <div className='grid grid-cols-12 border-r border-gray-500' key={post.id}>
              <div className='p-4 border-l border-t border-gray-500 col-span-1'>{await getUser(post.authorId).then(user => user['username'])}</div>
              <div className='p-4 border-l border-t border-gray-500 col-span-2'>{parseDateTime(post.postDate)}</div>
              <div className='p-4 border-l border-t border-gray-500 col-span-2'>
                {post.lastEditDate ? parseDateTime(post.lastEditDate) : parseDateTime(post.postDate)}
              </div>

              <div className={
                'p-4 border-l border-t border-gray-500 text-sky-600 underline underline-offset-1'
                + (deleteModeActive ? ' col-span-6' : ' col-span-7')
              }>
                <a href={"/blogs/" + post.id}> {post.title} </a>
              </div> 

              <div className={'p-4 border-l border-t border-gray-500' + (deleteModeActive ? ' col-span-1' : ' hidden')}>
                <label htmlFor={post.id}>
                  <input
                    className="w-5 h-5"
                    type="checkbox"
                    id={post.id}
                    name={post.id}
                    onClick={() => {
                      if (postsToDelete[post.id]) {
                        delete postsToDelete[post.id];
                      }
                      else {
                        postsToDelete[post.id] = post.title
                      }
                    }}
                  />
                </label>
              </div>

            </div>
          ))
        }
        <div className='border-b border-gray-500'> </div> {/*  to complete the border */}
        
        <div className="pt-8">
          <button
            className={"float-right border rounded-lg p-4"
              + (deleteModeActive ? ' border-red-400 bg-red-300 hover:bg-red-200' : ' hidden')}
            onClick={ async () => {
              if (Object.keys(postsToDelete).length === 0) {
                alert("No posts selected.")
                return
              }

              var confirmMessage = "Confirm to delete these posts? This action is NOT REVERSIBLE and all posts will PERMANENTLY be lost."

              for (const title of Object.values(postsToDelete)) {
                confirmMessage = confirmMessage + '\n' + title
              }
              
              if (confirm(confirmMessage)) {
                const request = await autoFetch('/api/deleteManyPosts', {
                  method: 'DELETE',
                  headers: {
                    "Content-Type": "text/plain;charset=UTF-8",
                  },
                  body: JSON.stringify({
                    "postsToDelete": Object.keys(postsToDelete).toString()
                  })
                })
                redirect('/dashboard')
              }
            }}
          >
            Confirm Delete
          </button>
        </div>
      </div>
      
      <div> </div>
    </main>
  )
}