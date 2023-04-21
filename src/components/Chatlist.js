import React from 'react'
import { Link } from 'react-router-dom'
import '../sytles/Chatlist.scss'

function Chatlist({name, id, image}) {
  return (
  //   style={{background:`url(${userimage})`, backgroundSize: 'cover'}}
  <li key={id}>
    <Link to={'/chatting'} state={{id, name, image}}>
      <span className='chats_img empty' style={{background:`url(${image})`, backgroundSize: 'cover'}}></span>
      <span className='chats_cont'>
        <span className='chats_name'>{name}</span>
        <span className='chats_latest'>Hello! This is a test message</span>
      </span>
      <span className='chats_time'><span>17</span>:<span>33</span></span>
    </Link> 
  </li>
  )
}

export default Chatlist