import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaComment} from "react-icons/fa";
import {FaPencilAlt} from "react-icons/fa";
import {FaCamera} from "react-icons/fa";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Profileinsert from '../components/Profileinsert';
import { updateProfile } from 'firebase/auth';
import { db, storage } from '../fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { object } from 'prop-types';
import { collection, query } from 'firebase/firestore';


function ProfileEdit({userObj}) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  console.log('userObj->',userObj);
  const[attachment, setAttachment] = useState("");
  const[newPhotoUrl, setNewPhotoUrl] = useState("");

  useEffect(() => {
    const q = query(collection(db, "newName"),
    )
  },[]);



  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== newDisplayName){
      await updateProfile(userObj,{
        displayName:newDisplayName,
      });
    }
    // try{
    //   let attachmentUrl = "";
    //   if(attachment !== ""){
    //     const storageRef = ref(storage, `prophoto/${uuidv4()}`)
    //     const response = await uploadString(storageRef, attachment, 'data_url')
    //     console.log('response->', response);
    //     attachmentUrl = await getDownloadURL(ref(storage, response.ref))//https:
    //   }


    // }catch(e){
    //   console.error("Error adding document:", e)
    // }
    setAttachment("");
    
  }

  const onFileSubmit = async (e) => {
    e.preventDefault();
    if(userObj.photoURL !== newPhotoUrl){
      await updateProfile(userObj,{
        photoURL:newPhotoUrl
      })
    }
  }


  const onFilechange = (e) => {
    console.log('e->',e);
    const {target:{files}} = e;
    const theFile = files[0]; 
    console.log('theFile->', theFile)
    console.log("currentTarget->", e.target); 

  

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log('finishedEvent->', finishedEvent);
      const{currentTarget:{result}} = finishedEvent // data:image
      setAttachment(result);
      setNewPhotoUrl(result);
      
    }
    reader.readAsDataURL(theFile);
  }

  // const onclearAttachment = () => {
  //   setAttachment('');
  // }



  const onChange = (e) => {
    const {target: {value}} = e;
    setNewDisplayName(value);
  }



  return (
    <>
    
    <main className='profile'>
      <section className='background' /*style={{background:`url(${bgimage})`, backgroundSize:'cover'}}*/>
        {/* <span><FaCamera/></span> */}
        <h2 className='blind'>My profile background image</h2>
      </section>
      

      <section className='profile'>
        <h2 className='blind'>My profile info</h2>
        <img className='profile_img empty' src={newPhotoUrl}  alt=''/>
        <span><FaCamera/></span>
        <div className='profile_cont'>
          <form action='/' method='post' onSubmit={onSubmit}>
            {/* <span className='profile_name'>{newDisplayName}</span> */}
            <span><FaCamera/></span>
            <input type='file' accept='image/*' id='attach-file' onChange={onFilechange}></input>
            <input type='text' onChange={onChange} value={newDisplayName} />
            
            <input type='submit'></input>
           <img src={newPhotoUrl} alt=''  width='100' height='100'/> 
          </form>
          <span >
              <FaPencilAlt/>
          </span>
          <input type='mail' className='profile_email' placeholder='abc@gmail.com' />
          <Profileinsert />
        </div>
      </section>
    </main>
  </>
  )
}

export default ProfileEdit