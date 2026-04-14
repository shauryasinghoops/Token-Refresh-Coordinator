import React from 'react'
import { BackgroundForAAccount } from '../components/BackgroundForAAccount'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div className='w-full min-h-screen bottom-0 bg-black fadeIn'>
      <BackgroundForAAccount>
        <LoginForm />
      </BackgroundForAAccount>
    </div>
  )
}
export default Login