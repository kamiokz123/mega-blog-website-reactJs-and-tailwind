import React from 'react'
import logo from "../assets/logo.png"

function Logo({width="100px"}) {
  return (
    <div
    className={`w-[${width}]`}
    >
      <img src={logo} alt="logo" className=' rounded-lg h-[40px] w-[50px]' />
    </div>
  )
}

export default Logo
