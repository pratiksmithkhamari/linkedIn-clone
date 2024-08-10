'use client'
import Link from 'next/link'

import React from 'react'

const Footer = () => {
    
  return (
    <div className="bg-slate-800 h-24 text-zinc-100 flex justify-center gap-5 items-center">
        <h2>
            &copy;  2023 - {new Date().getFullYear() }. All rights reserverd
        </h2>
        <div>
            <a href="https://github.com/your-github-username" target="_blank"></a>
            <Link href={'/'} className='hover:underline'>Home</Link>
        </div>
      
    </div>
  )
}

export default Footer
