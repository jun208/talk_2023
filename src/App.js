
import { useEffect, useState } from 'react';
import './App.css';

import Auth from './routes/Auth';
import { authService } from './fbase';
import { onAuthStateChanged } from "firebase/auth";
import AppRouter from './Router';



function App() {
  
  const[isLoggedIn, setIsLoggedIn]= useState(authService.currentUser);
  console.log('authService.currentUser ->', authService.currentUser)

  const[userObj, setUserObj] = useState(null);

  useEffect(()=>{
    onAuthStateChanged(authService, (user) => {
      console.log('user->', user)
      if (user) {
        setIsLoggedIn(user);
        setUserObj(user);
     
      } else {
        setIsLoggedIn(false);
      }
    });

  },[]);

  return (
   <>
   <AppRouter isLoggedIn ={isLoggedIn} userObj={userObj}/>
   </>    
  );
}

export default App;
