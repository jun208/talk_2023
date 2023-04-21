import axios from 'axios';
import { key, user } from 'fontawesome';
// import { render } from 'node-sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Friendlist from '../components/Friendlist';
import Search from '../components/Search';
import '../sytles/Main.scss'
import images  from  '../data/users.json'
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../fbase';
// const baseURL = "https://jsonplaceholder.typicode.com/users";

// const friends =  axios.get('https://jsonplaceholder.typicode.com/users');
//     console.log(friends);

function Main({userObj}) {

  // const [isLoading, setIsLoading]  = useState(true);
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
   <Header className="header"  title="Friends" left="Manage" right={<FontAwesomeIcon icon={faGear} />}/>
    <main>    
      <Search />
      <section className='main_section'>
        <header><h2 >My Profile</h2></header>
        <ul>
          <li>
            <Link to={'/mypro'}>
              <img class="profile_img empty" src={userObj.photoURL} alt='' />
              <span class="profile_name">{userObj.displayName}</span>
            </Link>  
          </li>

        </ul>
      </section>
      <section className='main_section'>
        <header><h2>Friends</h2></header>
        <ul>
          {friends.map((friend, index) => <Friendlist
                                            key={index}
                                            name={friend.name}
                                            id= {friend.id}
                                            email={friend.email}
                                            image={images[index].image}
                                            bgimage={images[index].bgimage}
                                            
                                           
                                          />)}

          {/* {images.map((image) => <Friendlist
                                          image={image.image}
                                          /> )} */}

          
        </ul>
      </section>
    </main>
    <Tabbar  home='on'/>
    </>
  )
  }
//  }


export default Main;