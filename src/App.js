
import './App.css';
import app from './firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';

const auth = getAuth(app);
function App() {

  const [user, setUser] = useState({});

  // create provider 
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // handle the sign in pop up by google
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.log('error', error);
      })
  }


  // handle sign out by google 
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })

      .catch(error => {
        console.log(error);
      })
  }

  // handle sign in by github 
  const handleSignInByGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className="App">

      {
        user.email ? <button onClick={handleSignOut}>sign out</button>
          : <>
            <button onClick={handleGoogleSignIn}>log into through google</button>
            <button onClick={handleSignInByGithub}>Sign in through github</button>
          </>

      }



      <h3>Name: {user.displayName}</h3>
      <h6>Your email: {user.email}</h6>
      <img src={user.photoURL} alt="" />
    </div>

  );

}

export default App;
