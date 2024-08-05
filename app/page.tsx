"use client";

import { useGlobalState } from "./context/globalProvider";
import Applications from "./Components/Applications/Applications";

export default function Home() {
  const{applications} = useGlobalState();
  return (
      <Applications title="All Applications" applications={applications} showAdd={true}/>
  );
}
