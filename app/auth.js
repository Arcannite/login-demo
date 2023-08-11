'use client'

import { signIn, signOut } from 'next-auth/react'

export function LoginButton() {
  return <button onClick={() => signIn()}> Log in </button>
}

export function LogoutButton() {
  return <button onClick={() => signOut()}> Log out </button>
}