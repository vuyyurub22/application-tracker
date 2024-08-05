"use client";
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Applications from '../Components/Applications/Applications';

function page() {
  const {incompleteApps} = useGlobalState();
  return (
    <div>
      <Applications title ="Ongoing Applications" applications = {incompleteApps} showAdd={false}/>
    </div>
  )
}

export default page