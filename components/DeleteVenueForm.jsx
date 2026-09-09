import React from 'react'
import Link from 'next/link'

const DeleteVenueForm = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mb-20">
    <div>DeleteVenueForm</div>
     <div className="rounded-full w-[200px] py-3 px-2 mt-8 flex justify-center border-t border-b border-t-yellow-200 border-b-yellow-900 
      bg-[linear-gradient(to_top,rgb(120,69,21,1),rgb(249,189,98,.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center tracking-widest">
        <Link href="/admin">Back</Link>
      </div>
    </div>
    
  )
}

export default DeleteVenueForm