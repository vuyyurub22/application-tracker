import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/app/utils/connect";
export async function DELETE(req:Request,{ params }: { params: { id: string } }){
    try{
        const {userId} = auth();
        const {id} = params;
        if(!userId){
            return NextResponse.json({error:"Unauthorized user", status:401});
        }
        const application = await prisma.applicationTracker.delete({
            where:{
                id,
            },
        });
        console.log("Deleted");
        return NextResponse.json(application);
    }catch(error){
        console.log("Error deleteing application");
        console.log(error);
        return NextResponse.json({error: "Error deleting", status:500});
    }

}
export async function PUT(req:Request,{ params }: { params: { id: string } }){
    try{
        const {userId} = auth();
        const {id} = params;
        const {title, status, date, completed, important} = await req.json(); 
        if(!userId){
            return NextResponse.json({error:"Unauthorized user", status:401});
        }
        const application = await prisma.applicationTracker.update({
            where :{
                id,
            },
            data:{
                title,
                status,
                date,
                completedStatus: completed,
                userId,
            }
        })
        console.log("Updated");
        return NextResponse.json(application);
    }catch(error){
        console.log("Error updating application");
        console.log(error);
        return NextResponse.json({error: "Error updating", status:500});
    }

}