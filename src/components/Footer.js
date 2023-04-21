import React from 'react'
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <footer style={{zIndex:'100'}} className="bg-light text-center text-white ">
      <div className="text-center p-3" style={{ backgroundColor: '#5F99B490' }}>
      Copyright © 2023 <Link to='/home' className="text-white">MemoryMate.com</Link>
      </div>
    </footer>
  )
}

export default Footer
