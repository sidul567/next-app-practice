"use client"

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import React from 'react'

type Props = {}

const LogOut = (props: Props) => {
  return (
    <Button
        variant={"destructive"}
        className="mt-6 mx-2"
        onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
      >
        Logout
      </Button>
  )
}

export default LogOut