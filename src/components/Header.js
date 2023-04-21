import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import {FaBluetoothB} from "react-icons/fa";
import { faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import '../sytles/Header.scss'
import { Link, useNavigate } from 'react-router-dom';
// import Tabbar from './Tabbar';

function Header(props) {




  return (
      <header className={props.className} >
        <div className='status_bar'>
          <div className='left_item'>
            <FontAwesomeIcon icon={faPlane} />
            <FontAwesomeIcon icon={faWifi} />    
          </div>
          <div className='center_item'>
            <span>15</span>:<span>33</span>
          </div>
          <div className='right_item'>
            <FontAwesomeIcon icon={faMoon} />
            <FaBluetoothB />     
            <span><span>100</span>%</span>
            <FontAwesomeIcon icon={faBatteryFull} />        
          </div>
        </div>
      <div className='title_bar'>
        <h1>{props.title} <span></span></h1>
        <div className='left_item'>
         <Link to={props.nav}>{props.left}</Link>
        </div>
        <div className='right_item'>
          <a>{props.right}{props.right2}</a>
          {/* <FontAwesomeIcon icon={faGear} /> */}
        </div>
      </div>
      </header>


    
  )
}

export default Header;