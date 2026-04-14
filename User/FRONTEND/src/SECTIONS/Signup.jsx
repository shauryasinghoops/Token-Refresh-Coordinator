import React from 'react'
import { BackgroundForAAccount } from '../components/BackgroundForAAccount'
import SignupForm from '../components/SignupForm'

const Signup = () => {
  return (
    <div className='w-full h-screen fadeIn '>
      <BackgroundForAAccount>
        <SignupForm />
      </BackgroundForAAccount>
    </div>
  )
}

export default Signup
