import React from 'react'

const AdminHeader = ({user}) => {
  return (
    <header className="w-full pt-3 pb-4 text-center mt-12 mb-6 border-b-2 border-dotted border-white">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p>Welcome, {user?.username}</p>
      </header>
  )
}

export default AdminHeader