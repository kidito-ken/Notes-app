import React, { useEffect, useState } from 'react';
import {Container} from 'react-bootstrap'
import styles from "./styles/NotesPage.module.css";
import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { user } from './models/user';
import * as NotesApi from "./network/notes_api";
import NotesPageLoggedInView from './components/NotesPageLoggedInView';
import NotespageLoggedOutView from './components/NotesPageLoggedOutView';


function App() {
  const [loggedInUser, setloggedInUser] = useState<user|null>(null)

  const [showSignUpModal, setshowSignUpModal] = useState(false)
  const [showLoginUpModal, setshowLoginUpModal] = useState(false)


  useEffect(()=>{
    async function fetchLoggedInUser() {
      try {
        const user= await NotesApi.getLoggedInUser()
        setloggedInUser(user)
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser()
  },[])
  return (
    <div>
      <NavBar
      loggedInUser={loggedInUser}
      onLogInClicked={()=>setshowLoginUpModal(true)}
      onSignUpClicked={()=>setshowSignUpModal(true)}
      onLogoutSuccessful={()=>setloggedInUser(null)}
      />

    <Container className={styles.notesPage}>
      <>
      {loggedInUser
      ? <NotesPageLoggedInView/>
      : <NotespageLoggedOutView/>
    }
      </>

    </Container>
    {
        showSignUpModal && 
        <SignUpModal 
        onDismiss= {()=>setshowSignUpModal(false)}
        onSignUpSuccessful = {(user) => {
            setloggedInUser(user)
            setshowSignUpModal(false)
        }}
        />
      }
            {
        showLoginUpModal && 
        <LoginModal 
        onDismiss= {()=>setshowLoginUpModal(false)}
        onLoginSuccessful = {(user) => {
          setloggedInUser(user)
          setshowLoginUpModal(false)
        }}
        />
      }
    </div>
  );
}

export default App;
