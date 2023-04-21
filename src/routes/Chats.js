import axios from 'axios';
import React, { useEffect, useState} from 'react'
import Chatlist from '../components/Chatlist'
import Header from '../components/Header'
import Search from '../components/Search'
import Tabbar from '../components/Tabbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {FaComment} from "react-icons/fa";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import '../sytles/Chats.scss'
import { Link } from 'react-router-dom'
import images  from  '../data/users.json'






function Chats() {

  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = async() => {
    const {
      data 
    }= 
    await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(data); 
    // setIsLoading(false);
    setFriends(data);
  }
  console.log(setFriends);


  return (
    <>
      <Header className="header" title="Chats" left="Edit" right={<FontAwesomeIcon icon={faGear} />}/>

      <main className='chats'>
      <Search />
      <section className='main_section'>
        <header className='chat_header'><h2 className='blind'>Friends</h2></header>
        <ul>
          {/* {users.map(user => (
                 <Chatlist 
                  userid = {user.id}
                  username = {user.name}
                  userimage={user.image}
                  /> 

          ))} */}

            {friends.map((friend, index) => <Chatlist
                                            key={index}
                                            name={friend.name}
                                            id= {friend.id}
                                            image={images[index].image}
                                        
                                                      />)}
                 
        </ul>
      </section>
   
      <div className='chat_fa_btn'>
        <a href="#">
          <FaComment />
        </a>
      </div>
      </main>
  
      <Tabbar chats='on'/>
      </>
    

 
    )
}

export default Chats