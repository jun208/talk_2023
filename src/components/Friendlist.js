import React from 'react'
import { Link } from 'react-router-dom'
// import '../sytles/Friendlist.scss'

function Friendlist({id, name,email, image, bgimage}) {
  return (
  <li key={id}>
    <Link to={'/Profile'} state= {{id, name,email, image, bgimage}}>
      <span class="profile_img empty" style={{background:`url(${image})`, backgroundSize:'cover'}}></span>
      <span class="profile_name" >{name}</span>
      <span class="profile_messages">Have a good day, See you soon</span>
    </Link>
  </li>
  )
}

export default Friendlist