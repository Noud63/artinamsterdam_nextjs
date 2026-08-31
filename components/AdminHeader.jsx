import React from 'react'

const AdminHeader = ({user}) => {
  return (
    <header className="adminHeader w-full py-2 text-center ">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p>Welcome, {user.username}</p>
      </header>
  )
}

export default AdminHeader