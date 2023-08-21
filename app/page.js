import { LoginButton, LogoutButton } from './utils/buttons'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)
  const loggedIn = !!session

  return (
    <main className="min-h-screen max-w-md mx-auto pt-60">
      {
        loggedIn ?
        (
          <div className='space-y-4 text-center'>
            <div className="text-4xl pb-8"> CMS app demo </div>
            <a className='text-sky-500 underline underline-offset-1 text-xl' href={"/dashboard"}>
              Go to dashboard
            </a>
            <div> or </div>
            <LogoutButton></LogoutButton>
          </div>
        ) :
        (
          <div className='space-y-4 text-center'>
            <div className="text-4xl pb-4"> CMS app demo </div>
            <div className="text-xl"> Login to see Posts.</div>
            <LoginButton></LoginButton>
          </div>
        ) 
      }
    </main>
  )
}
