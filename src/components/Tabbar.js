import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaSearch} from "react-icons/fa";
import { FaEllipsisH} from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import '../sytles/Tabbar.scss'

function Tabbar({chats, home, find, more}) {

  const location = useLocation();

  useEffect(() => {
    console.log('location->',location);

  },[location])
  
  // const [curtab , setCurtab ] = useState();

  const onClick = (e) => {
    
    // e.preventDefault();
    // console.log('e.target.style.color->',e.target.style.color);
    e.target.style.color='#513736';
    // e.target()
    
    // setCurtab(true);
  }
  
    

  // }

  return (
    <nav className='tab_bar' >
      <ul>
        <li  ><Link to={'/'} className={home} ><FaUser />Friends</Link></li>
        <li ><Link to={'/chats'} className={chats}  ><FaComment />Chats</Link></li>
        <li><Link to={'/find'} className={find}  ><FaSearch />Find</Link></li>
        <li><Link to={'/more'} className={more} ><FaEllipsisH />More</Link></li>
      </ul>
      
    </nav>
  )
}

export default Tabbar;