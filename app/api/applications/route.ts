import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";

export async function POST(req: Request){
    try{
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorized", status:401});
        }
        const {title, status, date} = await req.json(); 
        if(!title|| !status||!date){
            return NextResponse.json({error:"Fill out all fields please"});
        }
        const application = await prisma.applicationTracker.create({
            data: {
                title,
                date,
                completedStatus: 0,
                userId,
                status,
            },
        });
        return NextResponse.json({application});

    }catch(error){
        console.log("Unable to create a Job Application Tracker");
        console.log(error);
        return NextResponse.json({ error: "Unable to create a Job Application Tracker" });
    }
}

export async function GET(req: Request){
    try{
        const {userId} = auth();
        if(!userId){
            return NextResponse.json({error:"Unauthorized", status: 401});
        }
        const  application = await prisma.applicationTracker.findMany({
            where:{
                userId,
            },
        });
        return NextResponse.json(application);

    }catch(error){
        console.log("Unable to get Job Application Trackers");
    }
}
export async function PUT(req: Request){
    try{
        const {userId} = auth();
        const{isCompleted, id} = await req.json();
        if(!userId){
            return NextResponse.json({error:"Unauthorized", status: 401})
        }
        const completedStatus = (isCompleted+1)%3
        console.log(isCompleted);
        console.log(completedStatus);
        const application = await prisma.applicationTracker.update({
            where :{
                id,
            },
            data:{
                completedStatus,
            }
        })
        return NextResponse.json(application);
    }catch(error){
        console.log("Unable to update a Job Application Tracker");
    }
}
