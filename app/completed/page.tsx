"use client"
import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Applications from '../Components/Applications/Applications';

function page() {
  const {completedApps} = useGlobalState();
  return (
    <div><Applications title = "Completed Applications" applications ={completedApps} showAdd={false}/></div>
  )
}

export default page