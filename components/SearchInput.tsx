import React from 'react'
import { Input } from './ui/input'

const SearchInput = () => {
  return (
    <div className='md:w-[400px] w-[250px]'>
      <Input type='text' placeholder='search' className='rounded-lg '/>
    </div>
  )
}

export default SearchInput
