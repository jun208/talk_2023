import React from 'react'

import { FaUser } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaSearch} from "react-icons/fa";
import { FaEllipsisH} from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

function Tab() {
  return (
    <>
      <li ><Link to={'/'} ><FaUser />Friends</Link></li>
      <li><Link to={'/chats'}  ><FaComment />Chats</Link></li>
      <li><Link to={'/find'}  ><FaSearch />Find</Link></li>
      <li><Link to={'/more'}  ><FaEllipsisH />More</Link></li>
    </>
  )
}

export default Tab