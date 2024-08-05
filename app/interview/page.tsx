"use client";
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Applications from '../Components/Applications/Applications';

function page() {
  const {interviewApps} = useGlobalState();
  return (
    <div><Applications title ="Ongoing Applications" applications = {interviewApps} showAdd={false}/></div>
  )
}

export default page