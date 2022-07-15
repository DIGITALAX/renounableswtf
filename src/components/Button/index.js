import React from 'react'

const Button = props => {
  const { className } = props
  return (
    <button
      {...props}
      className={`${className} border rounded-full py-1 px-4 text-center animButton`}
    ></button>
  )
}

export default Button
