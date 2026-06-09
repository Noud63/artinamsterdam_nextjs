import React from 'react'
import LoginForm from '@/components/LoginForm'
import MenuBar from '@/components/MenuBar'

const LoginPage = () => {
  return (
    <div className="flex h-screen w-full justify-center bg-[linear-gradient(to_top,rgba(73,39,0,0.8),rgba(211,142,64,0.8)),url(/images/sunflowers.jpg)] bg-no-repeat bg-cover bg-center pt-20">
      <MenuBar />
      <LoginForm />
    </div>
  )
}

export default LoginPage

