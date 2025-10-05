import { Request, Response } from "express";
import { User } from "../models/models";
import bcrypt from "bcrypt";

export const getUsers = async(req:Request,res:Response)=>{
    try{
        const users = await User.findMany();
        res.status(200).json({ok:true,users:users})
    }catch(error){
        console.log(error);
        res.status(500).json({ok:false,message:"Internal error loading users"})
        
    }
}

export const registerUser = async(req:Request,res:Response)=>{
    try{
        const { email,password,username} = req.body;

        if (!email || !password || !username) {
            res.status(400).json({ok:false, message: "missing information" });
        }

        const existingUserEmail= await User.findUnique({where:{email}});
        const existingUserUsername= await User.findUnique({where:{username}});

        if (existingUserEmail || existingUserUsername){
            res.status(400).json({ok:false, message: "email or username already taken" });
        }

        const hashedPassword=await bcrypt.hash(password,5)
        const rol="";
        const active=true;
        const newUser = await User.create({
            data:{email,password:hashedPassword,username,rol,active}
        })
        res.status(201).json({ok:true,user:newUser});
    }catch(error){
        console.log(error);
        res.status(500).json({ok:false,message:"Internal error loading users"});
    }
}