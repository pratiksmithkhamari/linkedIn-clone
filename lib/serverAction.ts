"use server"

import { Post } from "@/models/postModel"
import { UserDocument, UserInterFace } from "@/models/userModel"
import { currentUser } from "@clerk/nextjs/server"
import { v2 as cloudinary  } from "cloudinary";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_KEY 
});



export const createPost =async (inputText:string,ImgDataUrl:string)=>{
    const user = await currentUser()
    if(!user){
        return {error:"You must be logged in to create a post."}
    }
    if(!inputText){
        return {error:"You must enter a post."}
    }
    const image = ImgDataUrl
    const UserData:UserInterFace = {
        firstName:user.firstName || "pratik",
        lastName:user.lastName || "Khamari",
        userId:user.id,
       profilePhoto:user.imageUrl
    }
    let uploadImg;
   try {
    
     if(image){
        uploadImg = await cloudinary.uploader.upload(image)
        Post.create({
            description:inputText,
            user:UserData,
            imageUrl:uploadImg.secure_url 
        })
     }else{

     }
   } catch {
    new Error("")
   }
}