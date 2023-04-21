import React from 'react'
import {FaAddressBook} from "react-icons/fa";
import {FaQrcode} from "react-icons/fa";
import {FaMobileAlt} from "react-icons/fa";
import {FaEnvelope} from "react-icons/fa";
import Header from '../components/Header';
import Tabbar from '../components/Tabbar';
import '../sytles/Find.scss'
function Find() {
  return (
  <>
  <Header className="header" title="Find" left="Edit"/>
  <main>
    <ul className='find_method'>
      <li><a href='#'><FaAddressBook />Find</a></li>
      <li><a href='#'><FaQrcode />QR Code</a></li>
      <li><a href='#'><FaMobileAlt />Shake</a></li>
      <li><a href='#'><FaEnvelope />Invite via SNS</a></li>
    </ul>
    <section className='recommend_section'>
      <header><h2>Recommended Friends</h2></header>
      <ul>
      <li>You Have no recommended friends.</li>
      </ul>
    </section>
    </main>
    <Tabbar find='on'/>
    </>


  )
}

export default Find