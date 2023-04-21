import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaComment } from 'react-icons/fa';
import { FaSmile } from 'react-icons/fa';
import { FaPaintBrush } from 'react-icons/fa';
import { FaRegHandPeace } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaInfoCircle } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { FaTv } from 'react-icons/fa';
import { FaPencilAlt } from 'react-icons/fa';
import { FaGraduationCap } from 'react-icons/fa';
import { faBuildingColumns} from '@fortawesome/free-solid-svg-icons';
import { faWonSign} from '@fortawesome/free-solid-svg-icons';
import { FaVideo } from 'react-icons/fa';
import { faGear } from "@fortawesome/free-solid-svg-icons";
import '../sytles/More.scss'
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';


function More({userObj}) {
  return (

    <>
      <Header className="header" title="More" right={<FontAwesomeIcon icon={faGear} />}/>
      <main>
        <section className='user_info'>
          <h2 className='blind'>사용자 정보</h2>
          <img className='profile_img empty' src={userObj.photoURL} alt='' />
          <span className='profile_info'>
            <span className='profile_name'>{userObj.displayName}</span>
            <span className='profile_email'>Userid@gmail.com</span>
          </span>
          <span className='chat_img'><a href='#'><FaComment /></a></span>        
        </section>
        <section className='user_menu'>
          <ul>
          <li><a href='#'><FaSmile />Emoticons</a></li>
          <li><a href='#'><FaPaintBrush />Themes</a></li>
          <li><a href='#'><FaRegHandPeace />Plus Friend</a></li>
          <li><a href='#'><FaUserCircle />Account</a></li>
          </ul>
        </section>
        <section className='plus_friends'>
          <header>
            <h2>Plus Friends</h2>
            <span><FaInfoCircle />Learn More</span>
          </header>
          <ul className='plus_list'>
          <li><a href='#'><FaUtensils />Order</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faHouseChimney} />Store</a></li>
          <li><a href='#'><FaTv />TV Channel/Radio</a></li>
          <li><a href='#'><FaPencilAlt />Creation</a></li>
          <li><a href='#'><FaGraduationCap />Education</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faBuildingColumns} />Politics/Society</a></li>
          <li><a href='#'><FontAwesomeIcon icon={faWonSign} />Finance</a></li>
          <li><a href='#'><FaVideo />Movies/Music</a></li>
          </ul>
        </section>
        <section className='more_app'>
          <h2 className='blind'>앱 더보기</h2>
          <ul>
          <li><a href='#'><span className='app_icon'></span>Kakao Story</a></li>
          <li><a href='#'><span className='app_icon'></span>Path</a></li>
          <li><a href='#'><span className='app_icon'></span>Kakao friends</a></li>
          </ul>
        </section>       
      </main>
      <Tabbar more = 'on'/>
    </>

  )
}

export default More