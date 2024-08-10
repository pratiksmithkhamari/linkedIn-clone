import { CommentDocument } from '@/models/commentModel'
import { PostInterface } from '@/models/postModel'
import React from 'react'
import SingleComment from './SingleComment'

const Comments = ({post}:{post:PostInterface}) => {
  return (
    <div className='ml-4 hover:bg-slate-100 rounded-lg'>
      {
        post.comments.map((comment:CommentDocument)=>{
          return ( 
           <div className=''>
             <SingleComment key={comment._id!} comment={comment} />
           </div>
          )
        })
      }
    </div>
  )
}

export default Comments
