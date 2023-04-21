import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './routes/Main'
import Chats from './routes/Chats'
import Chatting from './routes/Chatting'
import Find from './routes/Find'
import More from './routes/More'
import Profile from './routes/Profile'
import Mypro from './routes/Mypro'
import Auth from './routes/Auth'
import ProfileEdit from './routes/ProfileEdit'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from './fbase'

function AppRouter({isLoggedIn, userObj}) {
  const [newBgUrl, setNewBgUrl] = useState([]);
  console.log('userObjrou->',userObj);




  useEffect(() => {
    const q = query(collection(db, "bgImg"),
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

  return (
    <BrowserRouter>
    
      <Routes>
        {isLoggedIn ? (
          <>
          <Route path='/' element={<Main userObj={userObj} />} />
          <Route path='/chats' element={<Chats />} />
          <Route path='/chatting' element={<Chatting userObj={userObj} />} />
          <Route path='/find' element={<Find  />} />
          <Route path='/more' element={<More  userObj = {userObj} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/mypro' element={<Mypro userObj = {userObj} bgUrl = {newBgUrl} />}/> 
          <Route path='/profileEdit' element={<ProfileEdit userObj = {userObj} />} />
          </>
        ) : (
          <Route path='/' element={<Auth />}/>

        )}
         

         

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter