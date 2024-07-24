import { type ClassValue, clsx } from "clsx"
import { resolve } from "path"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const readFileAsString = (file:File | Blob)=>{
  return new Promise((resolve)=>{
    const reader = new FileReader()
    reader.onloadend = ()=>{
      if(typeof reader.result =="string"){
        return resolve(reader.result)
      }
    }
    reader.readAsDataURL(file)
  })

}