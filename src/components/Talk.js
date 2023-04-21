
import React, { useEffect, useState } from 'react'
import { doc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { db, storage } from '../fbase';
import { ref, deleteObject} from "firebase/storage";

function Talk(props) {
  console.log("props->", props);
  // console.log("props->", props);
  const {talkObj:{text, createdAt, id, attachmentUrl}}= props;
  // const [editing, setEditing] = useState(false);
  // const [newTalk, setNewTalk] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);

  useEffect(() => {
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
  })


  const onDeleteClick = async()=>{
    const ok = window.confirm("삭제하시겠습니까?")
    if(ok){
      const data = await deleteDoc(doc(db, "talks", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef =  ref(storage, attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }

  // const toggleEditing = () => setEditing((prev) => !prev);
  
  // const onChange = (e) => {
  //   const {target:{value}} =e
  //   setNewTalk(value);
  // }

  // const onSubmit = async(e) => {
  //   e.preventDefault();
  //   const newTalkRef = doc(db, "talks")
  // }

  return (
    <>
    {/* {editing ? (
    <>    
      <div className='chat_box my'>
        <span className='chat' onChange={onChange}>{newTalk}</span>
        <button>Submit</button>
      </div>
      <button onClick={toggleEditing}>Cancel</button>
    </>
    ) : ( */}
      <>
      <span className='chat'>{text}</span>
      {attachmentUrl && (
         <img src={attachmentUrl} alt='' style={{width:'100px', height: '100px'}}/>
      )}    
      <span className='chat_time'></span>
      <div>
        {/* <button onClick={toggleEditing}><FontAwesomeIcon icon={faPen} /></button> */}
        <button  onClick={onDeleteClick}><FontAwesomeIcon icon={faXmark}/></button>
      </div>
      </>

    {/* )}
 */}

    </>
  )
}

export default Talk