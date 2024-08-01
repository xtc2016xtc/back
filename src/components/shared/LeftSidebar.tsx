//2.26.13 import React from 'react'

import { logoImg } from "@/utils"
import { Link } from "react-router-dom"

const LeftSidebar = () => {
  return (
    <nav className="leftSidebar">
      <div className="flex flex-col gap-11">
      <Link to="/" className='flex items-center gap-3'>
        <img 
          src={logoImg} 
          alt="logo"
          width={170}
          height={36}
          />
      </Link>

      <Link 
        to={``}
      >
      </Link>
      </div>
    </nav>
  )
}

export default LeftSidebar