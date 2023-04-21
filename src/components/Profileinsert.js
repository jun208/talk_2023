import React from 'react'
import {FaComment} from "react-icons/fa";
import {FaPencilAlt} from "react-icons/fa";

function Profileinsert(props) {
  return (
    <ul className='profile_menu'>
    <li>
      <a href='#'>
        <span className='icon'>
          <FaComment />
        </span>
        My Chatroom
      </a>
    </li>
    <li>
      <a href='#'>
        <span className='icon'>
          <FaPencilAlt />
        </span>Edit Profile
      </a>
    </li>
    </ul>
  )
}

export default Profileinsert