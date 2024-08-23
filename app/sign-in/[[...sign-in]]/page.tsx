"use client";
import React from 'react'
import { SignIn } from '@clerk/nextjs';

function page() {
  return (
    <div className="flex justify-center mt-16">
        <SignIn />
    </div>

  )
}

export default page
