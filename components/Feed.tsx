import React from 'react'
import PostInput from './PostInput'
import PostFeed from './PostFeed'

const Feed = async({userDetails}:{userDetails:any}) => {
  const userJson = JSON.parse(JSON.stringify(userDetails))
  return (
    <div className='flex-1 flex flex-col gap-4 '>
      <PostInput user={userJson} />
      
      <PostFeed />
    </div>
  )
}

export default Feed
