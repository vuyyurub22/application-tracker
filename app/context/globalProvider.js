"use client"
import React, {createContext, useState, useContext, useEffect} from "react"
import axios from "axios";

export const GlobalContext = createContext()
export const GlobalUpdateContext = createContext();
import themes from "./themes";
import { useUser } from "@clerk/nextjs";

export const GlobalProvider = ({children}) =>{
    const {user} = useUser();
    
    const [selectedTheme, setSelectedTheme] = useState(0);
    const theme = themes[selectedTheme];
    
    const[isLoading, setIsLoading] = useState(false);
    const[applications, setApplications] = useState([]);

    const[modal, setModal] = useState(false);
    const openModal = () =>{
        setModal(true);
    }
    const closeModal = () =>{
        setModal(false);
    }

    const getApplications = async () =>{
        setIsLoading(true);
        try{
            const response = await axios.get("/api/applications");
            setApplications(response.data);
            setIsLoading(false);
        }catch(error){
            console.log(error);
        }

    }
    const deleteApps = async (id) => {
        try{
            const response = await axios.delete(`/api/applications/${id}`);
            getApplications();
        }catch(error){
            console.log(error);
        }
    }
    const updateApps = async(app) =>{
        try{
            const response = await axios.put(`/api/applications`, app);
            console.log("Here");
            getApplications();
        } catch(error){
            console.log(error);
        }
    }

    const completedApps = applications.filter((app)=>app.isCompleted===true);
    const incompleteApps = applications.filter((apps) => apps.isCompleted===false);
    const interviewApps = applications.filter((apps)=>apps.status==="interview");

    useEffect(()=>{
        if(user){
            getApplications();
        }
    },[user]);

    return (
        <GlobalContext.Provider value = {{theme, applications,deleteApps,isLoading,completedApps,incompleteApps, updateApps, modal, openModal, closeModal, getApplications,interviewApps}}>
            <GlobalUpdateContext.Provider value ={{}}>
                {children}

            </GlobalUpdateContext.Provider>

        </GlobalContext.Provider>
    )
}
export const useGlobalState = ()=>useContext(GlobalContext);
export const useGLobalUpdate =()=>useContext(GlobalUpdateContext);