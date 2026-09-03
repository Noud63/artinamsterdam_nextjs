import React from 'react'
import Link from 'next/link'

const DeleteVenueForm = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mb-20">
    <div>DeleteVenueForm</div>
     <div className="backButton mt-8">
        <Link href="/admin">Back</Link>
      </div>
    </div>
    
  )
}

export default DeleteVenueForm