import React from 'react'

function Button({
    children,
    type="button",
    bgColor="bg-blue-600",
    textColor="text-white",
    className="",
    ...props
}) {

  console.log("type : ", type);
  
  return (
    <button
    type="submit"
    className={`py-2 px-4 ${className} ${bgColor} ${textColor}`}
    {...props}
    >{children}</button>
  )
}

export default Button
