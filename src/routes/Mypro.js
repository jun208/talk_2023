import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaComment} from "react-icons/fa";
import {FaPen} from "react-icons/fa";
import {FaDoorOpen} from "react-icons/fa";
import {FaCamera} from "react-icons/fa";
import {FaPlus} from "react-icons/fa";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import '../sytles/MyPro.scss'
import { updateProfile } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { authService, db, storage } from '../fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { object } from 'prop-types';

function Mypro({userObj, bgUrl}) {
 

  const [editing, setEditing] = useState(false);

  const [proEditing, setProEditing] = useState(false);
  const [bgEditing, setBgEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);
  // const [newPhotoUrl, setNewPhotoUrl] = useState(userObj.photoURL);
  const [attachment, setAttachment] = useState("") //공백문자 false
  const [bgAttachment, setBgAttachment] = useState("")
  const [newBgUrl, setNewBgUrl] = useState([]);

  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/'); //첫화면으로 이동
  }

  useEffect(() => {
    const q = query(collection(db, "bgImg"),
              where("creatorId", "==", userObj.uid),
              orderBy("createdAt", "desc"));
              // console.log('userObj->',userObj)
                    
                    
        
              const unsubscribe = onSnapshot(q,(querySnapshot)=> {
                const newArray = [];
                  querySnapshot.forEach((doc)=>{
                    newArray.push({...doc.data(), id:doc.id})
                    console.log('data->',{...doc.data});
                    console.log('newArray->',newArray);
                  });
                  setNewBgUrl(newArray[0].bgImgUrl);
                });
               
                
              },[]);

    



  // const {profile:bgImg} = setNewBgUrl;

  const toggleEditing = () => setEditing((prev) => !prev);

  const toggleProEditing = () => setProEditing((prev) => !prev);

  const toggleBgEditing = () => setBgEditing((prev) => !prev);


  const onChange = (e) => {
    const {target: {value}} =e;
    setNewDisplayName(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if( newDisplayName !== ""){
      // await updateProfile(userObj,{
      //   displayName: newDisplayName,
      // });
      
      try{
        const docRef = await addDoc(collection(db,"profile"),{
          text: newDisplayName,
          createdAt: Date.now(),
          creatorId: userObj.uid
        
        })
        console.log("Document written with ID: ", docRef.id);
        if(userObj.displayName !== newDisplayName){
          await updateProfile(userObj,{
            displayName:newDisplayName,
          });
        }
        
      }
      
      catch(e){
        console.log("Error adding document: ", e);
      }
      setNewDisplayName("");
  
    setEditing(false)
  }
}

const onFilechange = (e) => {
  console.log('e->',e)
  const{target:{files}} = e;
  const theFile = files[0];
  console.log('theFile->', theFile);
 

  const reader = new FileReader();
  reader.onloadend = (finishedEvent) => {
    console.log('finishedEvent->', finishedEvent);
    const{currentTarget:{result}} = finishedEvent // data:image
    // setNewPhotoUrl(result);
    setAttachment(result)
    console.log('setBgAttachment->', setBgAttachment)
    

  }
  reader.readAsDataURL(theFile);
}

  const onFileSubmit = async (e) => {
    e.preventDefault();
    let attachmentUrl ="";

    if(attachment !== ""){
      
      const storageRef = ref(storage, `'proImg'/${uuidv4()}`);
      const response = await uploadString(storageRef, attachment, 'data_url')
      console.log('response->', response);
      attachmentUrl = await getDownloadURL(ref(storage, response.ref)); //https:
      console.log('attachmentUrl->',attachmentUrl)
      // setNewPhotoUrl(attachmentUrl)
      // console.log('profiles->',profiles)


      // setAttachment("");

    

      // if(userObj.photoURL !== newPhotoUrl){
      //   await updateProfile(userObj,{
      //     photoURL: newPhotoUrl,
      //   });
      // }
      // console.log('newPhotoUrl->',newPhotoUrl)
      // console.log('userObj.photoURL',userObj.photoURL)
     
    
    // }catch (e) { console.error("Error adding document: ", e);}
    // setAttachment("");

  }

  const docRef = await addDoc(collection(db, "profile"),{
    text: userObj.displayName,
    createdAt: Date.now(),
    creatorId: userObj.uid,
    profileImg: attachmentUrl,
   
  })    
  console.log("Document written with ID: ", docRef.id);
   if(attachmentUrl !== userObj.photoURL){
    await updateProfile(userObj,{
      photoURL:attachmentUrl
    })
    setProEditing(false);
   }
   console.log('userObj.photoURL->', userObj.photoURL)
  }

const onBgchange = (e) => {
  console.log('e->',e)
  const{target:{files}} = e;
  const theFile = files[0];
  console.log('theFile->', theFile);

const bgReader = new FileReader();
   bgReader.onloadend =  (finishedEvent) => {
    console.log('finishedEvent->', finishedEvent);
    const{currentTarget:{result}} = finishedEvent // data:image
    setBgAttachment(result);
    console.log('setBgAttachment->', setBgAttachment)
  }
  bgReader.readAsDataURL(theFile);
}

const onBgSubmit = async (e) => {
  e.preventDefault();

  let bgAttachmentUrl ="";

  if(bgAttachment !== ""){
    
    const storageRef = ref(storage, `'bgImg'/${uuidv4()}`);
    const response = await uploadString(storageRef, bgAttachment, 'data_url')
    console.log('response->', response);
    bgAttachmentUrl = await getDownloadURL(ref(storage, response.ref)); //https:
    console.log('bgAttachmentUrl->',bgAttachmentUrl)
    // setNewPhotoUrl(attachmentUrl)
    // setAttachment("");
    try{
      const docRef = await addDoc(collection(db, "bgImg"),{
        createdAt: Date.now(),
        creatorId:userObj.uid,
        bgImgUrl: bgAttachmentUrl
       
      })
      console.log("Document written with ID: ", docRef.id);  
    }catch(e){
      console.log("Error adding document: ", e);
    }
   

    

    // if(userObj.photoURL !== newPhotoUrl){
    //   await updateProfile(userObj,{
    //     photoURL: newPhotoUrl,
    //   });
    // }
    // console.log('newPhotoUrl->',newPhotoUrl)
    // console.log('userObj.photoURL',userObj.photoURL)
   
  
  // }catch (e) { console.error("Error adding document: ", e);}
  setAttachment("");
  setBgEditing(false);
 

}




// setNewBgUrl(profileObj[0].bgImg);


// if(bgAttachmentUrl !== newBgUrl){
//   await 
// }

// setNewBgUrl(bgAttachmentUrl)
// console.log( )


}


  
  

  // const location = useLocation();
  // console.log(location);

  // const navigate = useNavigate();
  // if(location.state === undefined){
  //   navigate('/');
  // }

  // const{id,name,email,image,bgimage} = location.state;


  return (
    <>
       <Header className='header profile_header'  left={<FontAwesomeIcon icon={faXmark}/>} right={<FontAwesomeIcon icon={faUser} />} nav='/'  /> 
      <main className='profile'>
        <section className='background' /*style={{background:`url(${bgimage})`, backgroundSize:'cover'}}*/>
        {bgEditing ? (
        <>
          <img className='bg_img' src={newBgUrl} alt='' width='100%' height='100%'></img>
           {bgAttachment && (<img className='bg_img' src={bgAttachment} alt='' width='100' height='100'></img>)} 
          <div className='bg_box_edit'>
            <form action='/' method='post' onSubmit={onBgSubmit}>
              <label>  
                <input type='file' onChange={onBgchange} style={{display:'none'}} />
                <span>
                  <FaPlus />
                </span>
              </label> 
              <input type='submit' value='Update' />
            </form>            
            <button className='canBtn' onClick={toggleBgEditing}>Cancel</button>            
          </div>
          {/* {bgAttachment && (<img className='bgAttach_img' src={bgAttachment} alt='' width='100' height='100' />)} */}
          
          
         
        </>
        ) : (
        
        <>
          <img src={newBgUrl} alt='' width='100%' height='100%'></img>
          <span onClick={toggleBgEditing} className='mypro_icon bg_img'>
            <FaCamera/>
          </span>          
        </> 
         )} 


          {/* <form action='/' method='post' onSubmit={onBgSubmit}>   
            <input type='file' onChange={onBgchange}></input>
            <input type='submit' value='update' />
          </form>
          <img src={bgAttachment} alt='' width='100' height='100' />
          <h2 className='blind'>My profile background image</h2> */}
        </section>

        <section className='profile'>
          <h2 className='blind'>My profile info</h2>
       {proEditing ? (   
          <div className='profile_img_edit'>  
            <img className='profile_img empty edit' src={attachment} alt='' /> 
            <form onSubmit={onFileSubmit} className='mypro_img_form'>
              <label for='proimg'>
                <input type='file' accept='image/*' id='proimg' onChange={onFilechange} style={{display: 'none'}}/>
                <span className='mypro_icon add'><FaPlus /></span>
              </label>
              <input type='submit' value='Update'/>
              <button className='mypro canBtn' onClick={toggleProEditing} >Cancel</button>
              
            </form>
          </div>
           ) : (  
            <>
              <img className='profile_img empty' src={userObj.photoURL}  alt='' /*style={{background:`${blue}`, backgroundSize:'cover'}}*/   />            
              <span  onClick={toggleProEditing} className='mypro_icon pro_img'>
                <FaCamera/>
              </span>
            </>
            
           )}  


          <div className='profile_cont'>
         {editing ? ( 
                <div className='mypro_pro'>
                  <form className='pro_form' action='/' method='post' onSubmit={onSubmit}>
                    <label htmlfor='profile_name' className='blind'>프로필 이름 변경 입력</label>
                    <input type='text' id='profile_name' className='name_field' placeholder={userObj.displayName} value={newDisplayName} onChange={onChange} />
                    <input  type='submit' value='Update'   />              
                  </form>
                  <button onClick={toggleEditing} className='mypro_canBtn'>Cancel</button>
                </div>
           ) : ( 
            <>
            <div>
              <span className='profile_name'>{userObj.displayName}</span>
              <span onClick={toggleEditing} className='mypro_icon pro_name'>
                <FaPen/>
              </span>
            </div>
              <input type='mail' className='profile_email' placeholder='abc@gmail.com' />
            <ul className='profile_menu'>
            <li>
              <a href='#'>
                <span className='icon'>
                  <FaComment />
                </span>
                My Chatroom
              </a>
            </li>
            <li onClick={onLogOutClick}>
              <Link to={'/profileEdit'}>
                <span className='icon'>
                  <FaDoorOpen />
                </span>
                Log Out
              </Link>
            </li>
            </ul>
            </>

           )} 
        

          </div>
        </section>
      </main>
    </>
  )
}

export default Mypro;