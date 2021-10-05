import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, FacebookAuthProvider, updateProfile } from "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';


function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUSer] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    // console.log(user)

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    // console.log(loggedInUser);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };



    const app = initializeApp(firebaseConfig);
    const googleProvider = new GoogleAuthProvider();
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();

    const handleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const isSignedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUSer(isSignedInUser);

                console.log(displayName, email, photoURL);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }
    const handleFbSignIn = () => {
        signInWithPopup(auth, fbProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log('fb user after sign in', user);

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth)
            .then(res => {
                const signOutUser = {

                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setUSer(signOutUser);

            })
            .catch(err => {
                console.log(err)
            })

        console.log('signout clicked')
    }
    const handleSubmit = (e) => {
        // console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            // const auth = getAuth();
            createUserWithEmailAndPassword(auth, user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUSer(newUserInfo);
                    // updateUserName(user.name);
                    // console.log(res)
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUSer(newUserInfo)
                    // const errorMessage = error.message;
                    // console.log(errorCode, errorMessage);
                })
            // console.log('submit')
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(auth, user.email, user.password)
                .then(res => {
                    console.log(res)
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUSer(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    // console.log('sign in user info', res.user)
                });
        }
        e.preventDefault()
    }

    const handleBlur = (e) => {
        // console.log(e.target.name, e.target.value);
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)
            // console.log(isEmailValid);
        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = (isPasswordValid && passwordHasNumber)
        }

        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUSer(newUserInfo);
        }

    }

    // const updateUserName = (name) => {
    //   updateProfile(auth.currentUser, {
    //     displayName: name,
    //   })
    //     .then(() => {
    //       console.log('user name updated succefully')
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
    // }

    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={() => handleSignOut()}>Sign Out</button> :
                    <button onClick={handleSignIn}>Sign In</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Login with Facebook</button>
            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt='' />
                </div>
            }

            {/* email authentication */}

            <h1>Own Authentication</h1>
            {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">Sign Up</label>
            <br />
            <form action="" onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" placeholder="Your name" onBlur={handleBlur} />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your email address" required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created ' : 'Logged In'} successfully</p>}
        </div>
    );
}


export default Login;
