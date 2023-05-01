import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from '../fbase';
import { async } from '@firebase/util';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import '../sytles/Auth.scss'

function Auth() {
  const [email, setEmail] = useState('');
  const[password, setPassword]=useState('');
  const[newAccount, setNewAccount] = useState(true); //true 회원가입, false 로그인
  const[error, setError] = useState('');

  const onChange = async(e) =>{
    console.log('e.target.name ->', e.target.name)
    console.log(e);
    const{target:{name, value}}= e
    if(name === 'email'){
      setEmail(value);
    }else if(name === 'password'){
      setPassword(value);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
      let data;
      if(newAccount){
        //회원가입
        data = await createUserWithEmailAndPassword(authService, email, password);
      }else{
        //로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log('data->', data)

    }catch(error){
      console.log('error->', error)
      setError(error.message);
    }

  }

  const toggleAccount = () => setNewAccount(prev => !prev);
  
  const onSocialClick = async (e) => {
    console.log('e.target.name->',e.target.name);
    const {target : {name}} = e;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider();
    }else if (name === "github"){
      provider = new GithubAuthProvider();
    }
    const data =  await signInWithPopup(authService, provider);
    console.log('data->',data)
  }



  return (
    <div className='auth'>
      <div className='kakaoLogo'>Talk !</div>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' required value={email}  onChange={onChange} ></input>
        <input name='password' type='password' placeholder='Password'  required value={password} onChange={onChange}></input>
        <input type='submit' value={newAccount ? "Create Account" : "Log in"} ></input>
        { error && <span className='authError'>{error}</span>}  
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div className='socialLog'>
        <button name='google' onClick={onSocialClick}><FaGoogle /> Continue with Google </button>
        <button name='github' onClick={onSocialClick}><FaGithub /> Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth