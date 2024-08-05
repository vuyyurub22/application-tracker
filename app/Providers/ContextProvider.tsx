"use client";
import React from 'react'
import { GlobalProvider } from '../context/globalProvider';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

interface Props {
    children : React.ReactNode;
}
function ContextProvider({children}:Props) {
  const [isReady, setIsReady] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setIsReady(true);
    },200);
  },[])

  if(!isReady){
    return(
      <h1>Loading...</h1>
    )
  }

    return (
      <GlobalProvider><Toaster />{children}</GlobalProvider>
    )

}

export default ContextProvider;