import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaComment} from "react-icons/fa";
import {FaPencilAlt} from "react-icons/fa";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../sytles/Profile.scss'

function Profile() {

  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/');
  }
 


  const{name,email,image,bgimage} = location.state;

  return (
    <>
    <Header  className="header profile_header" left={<FontAwesomeIcon icon={faXmark} />  } right={<FontAwesomeIcon icon={faUser}  />} nav='/' />
      <main className='profile'>
        <section className='background' style={{background:`url(${bgimage})`, backgroundSize:'cover'}}>
          <h2 className='blind'>My profile background image</h2>
        </section>

        <section className='profile'>
          <h2 className='blind'>My profile info</h2>
          <div className='profile_img empty'style={{background:`url(${image})`, backgroundSize:'cover'}}  ></div>
          <div className='profile_cont'>
            <span className='profile_name'>{name}</span>
            <input type='mail' className='profile_email' placeholder={email} />
            
          </div>
        </section>
      </main>
      </>
  )
}

export default Profile