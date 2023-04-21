import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaSmile} from "react-icons/fa";
import {FaMicrophone} from "react-icons/fa";
import {FaPlus} from "react-icons/fa";
import { faAngleLeft, faMagnifyingGlass, faBars} from "@fortawesome/free-solid-svg-icons";
import { collection, addDoc, query, orderBy, getDocs, onSnapshot } from "firebase/firestore";
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../sytles/Chatting.scss'
import { db, storage } from '../fbase';
import { v4 as uuidv4 } from 'uuid';
import Talk from '../components/Talk';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

function Chatting({userObj}) {
  
  const[talk, setTalk] = useState('');
  const[talks, setTalks] = useState([]);
  const[attachment, setAttachment] = useState("") //공백문자 false
 


  



  // const getTalks = async () =>{
  //   const querySnapshot = await getDocs(collection(db, "talks"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //     const talkObject = {...doc.data(), id:doc.id}
  //     setTalks(prev => [talkObject,...prev]);// 새 트윗을 가장 먼저 보여준다
  //   });
  // } 


  useEffect(()=>{
    const q = query(collection(db, "talks"),
              orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      const newArray = [];
      querySnapshot.forEach((doc) =>{
        newArray.push({...doc.data(), id:doc.id});
        console.log('newArray->',newArray)
      });
      setTalks(newArray);
      console.log('setTalks->',setTalks);
      
    });
  },[])

  const location = useLocation();
  console.log(location);

  const navigate = useNavigate();
  if(location.state === undefined){
    navigate('/');
  }

  const{name,image} = location.state;

  const onChange = (e) => {
    e.preventDefault();
    console.log(e);
    const{target:{value}} = e;
    setTalk(value);
    // console.log('talk->', talk);
    
  
  }

  const onSubmit =async (e) => {
    e.preventDefault();
    if(talk !== ""){
      try {
        let attachmentUrl ="";
        if(attachment !== ""){
          const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
          const response = await uploadString(storageRef, attachment, 'data_url')
          console.log('response->', response);
          attachmentUrl = await getDownloadURL(ref(storage, response.ref)) //https:
        }
        const docRef = await addDoc(collection(db, "talks"), {
          text: talk,
          createdAt: Date.now(),
          creatorId: userObj.uid,
          attachmentUrl
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      setTalk("");
      setAttachment("");
    }
  }

  const onFilechange = (e) => {
    console.log('e->',e);
    const {target:{files}} = e;
    const theFile = files[0];
    console.log('theFile->', theFile)
    console.log("currentTarget->", e.target);

    const reader = new FileReader(); //선택한 파일 브라우저상에서 보이게 하기 위해
    reader.onloadend = (finishedEvent) => {
      console.log('finishedEvent->',finishedEvent);
      const{currentTarget:{result}} = finishedEvent //data:image
      setAttachment(result);

    }
    reader.readAsDataURL(theFile);
    
  }

  const onclearAttachment = () => {
    setAttachment('');
  }


  return (
  <> 
  <Header className="header chatting_header" title={name} left={<FontAwesomeIcon icon={faAngleLeft}/>}  right={<FontAwesomeIcon icon={faMagnifyingGlass} /> } right2 ={<FontAwesomeIcon icon={faBars} /> } nav='/chats'/>  
    <main className='chatting'>
    <span className='date_info'>Thursday,March 23, 2023</span>
      <div className='chat_box my'>
        <span className='chat'>Hello!</span>
        <span className='chat_time'><span>15</span>:<span>33</span></span>

      </div>
      <div className='chat_box other'>
        <div className='other_info'>
          <a href='#'><span className='profile_img empty' style={{background:`url(${image})`, backgroundSize: 'cover'}}></span></a>
          <span className='profile_name'>{name}</span>
        </div>
          <span className='chat'>And this is an answer</span>
          <span className='chat'>And this is an answer And this is an answer</span>
          <span className='chat'>And this is an answer</span>
          <span className='chat_time'><span>17</span>:<span>33</span></span>
      </div>
      <div className='chat_box my'>
        {talks.map(talk => (
          <Talk talkObj ={talk} isOwner={talk.creatorId === userObj.uid}/>
        ))}

        
             
      </div>
    </main>
    <footer>


      <form action='/' method='post' onSubmit={onSubmit}>
      
        <fieldset className='text_box'>
        <legend className='blind'>채팅 입력창</legend>
          <label for='chatting' className='blind'>채팅 입력</label>
          <input type='text' id='chatting' className='text_field' onChange={onChange} value={talk} />
          <span className='emoticon_btn'><a href='#'><FaSmile /></a></span>
          <span className='voice_btn'><a href='#'><FaMicrophone /></a></span>
        </fieldset>
        <fieldset className='attach_box'>
        <legend className='blind'>파일 첨부</legend>
          <label htmlFor='attach-file' className='' >
            <input type='file' accept='image/*' id='attach-file' onChange={onFilechange} style={{display:'none'}} />
            <span className='plus_btn'><FaPlus /></span>
          </label>
            {attachment && (       
            <div className='attach__imageBox'>
              <img src={attachment} alt='' width='100' height='100'/>
              <div onClick={onclearAttachment} className='remove_btn'>Remove</div>
            </div>
            )}          
        </fieldset> 
      </form>
    </footer>
  </>
  )
}

export default Chatting