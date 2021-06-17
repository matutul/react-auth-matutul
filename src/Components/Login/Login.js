import { Button } from 'react-bootstrap';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../../App';
import { initializeFirebaseAppFramework, newUserCreateWithEmailPassword, userSignInWithEmailAndPassword, userSignInWithFacebook, userSignInWithGoogle } from '../Firebase/Firebase';
import './Login.css';
import googleIcon from '../../icons/google.svg';
import facebookIcon from '../../icons/facebook.svg';

initializeFirebaseAppFramework();

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [validPassword, setIsPasswordValid] = useState({
        isValidPassword: true,
        isValidPasswordMessage: '',
        isPasswordMatch: ''
    });
    const [user, setUser] = useState({
        fullname: '',
        email: '',
        password: ''
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    // form fields validation
    const handleOnBLur = (e) => {
        let isFieldValid = false;

        if (e.target.name === "fullname") {
            isFieldValid = true;
        }

        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }

        if (e.target.name === "password") {
            if (isNewUser) {
                isFieldValid = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(e.target.value);
                if (isFieldValid) {
                    const passwordValidationCheck = { ...validPassword };
                    passwordValidationCheck.isValidPassword = true;
                    passwordValidationCheck.isValidPasswordMessage = '';
                    setIsPasswordValid(passwordValidationCheck);
                }
                else {
                    const passwordValidationCheck = { ...validPassword };
                    passwordValidationCheck.isValidPassword = false;
                    passwordValidationCheck.isValidPasswordMessage = 'Password must need 6 to 16 characters including at least 1 number and 1 special character.';
                    setIsPasswordValid(passwordValidationCheck);
                }
            }
            else {
                isFieldValid = true;
            }
        }

        if (e.target.name === 'confirmPassword') {
            isFieldValid = (user.password === e.target.value);
            if (!isFieldValid) {
                const passwordValidationCheck = { ...validPassword };
                passwordValidationCheck.isPasswordMatch = 'Password does not match..!';
                setIsPasswordValid(passwordValidationCheck);
            }
            else {
                const passwordValidationCheck = { ...validPassword };
                passwordValidationCheck.isPasswordMatch = '';
                setIsPasswordValid(passwordValidationCheck);
            }
        }

        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[e.target.name] = e.target.value;
            setUser(userInfo);
        }
    }// END of form fields validation



    // handleSubmit >> sign up or sign in ====================================== SIGN UP OR SIGN IN ================================================
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isNewUser && user.email && user.password) {
            newUserCreateWithEmailPassword(user)
                .then(res => {
                    const responseKey = Object.keys(res);
                    if (responseKey.find(key => key === "displayName")) {
                        alert(`Hello ${user.fullname}, Your sign up is successfull. Sign in now.`);
                        setIsNewUser(false);
                    }
                    if (responseKey.find(key => key === "code")) {
                        alert(res.message);
                    }
                })

        }
        if (!isNewUser && user.email && user.password) {
            userSignInWithEmailAndPassword(user)
                .then(res => {
                    console.log(res);
                    const responseKey = Object.keys(res);
                    if (responseKey.find(key => key === "displayName")) {
                        setLoggedInUser(res);
                        alert("Sign in is successfull");
                        history.replace(from);
                    }
                    if (responseKey.find(key => key === "code")) {
                        alert(res.message);
                    }
                })
        }

    }
    // END of handleSubmit >> sign up or sign in


    const handleGoogleSignIn = () => {
        userSignInWithGoogle()
            .then(res => {
                const responseKey = Object.keys(res);
                if (responseKey.find(key => key === "displayName")) {
                    setLoggedInUser(res);
                    alert("Sign in is successfull");
                    history.replace(from);
                }
                if (responseKey.find(key => key === "code")) {
                    alert(res.message);
                }
            })
    }
    const handleFacebookSignIn = () => {
        userSignInWithFacebook()
            .then(res => {
                const responseKey = Object.keys(res);
                if (responseKey.find(key => key === "displayName")) {
                    setLoggedInUser(res);
                    alert("Sign in is successfull");
                    history.replace(from);
                    
                }
                if (responseKey.find(key => key === "code")) {
                    alert(res.message);
                }
            });
    }


    return (
        <div className="auth-section">
            <div className="auth-card">
                <h2>Authorize Yourself</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-checkbox">
                        <input type="checkbox" onClick={() => setIsNewUser(!isNewUser)} name="signInOrOut" id="input-1" />
                        <label htmlFor="signInOrOut">New user registration</label>
                    </div>

                    {
                        isNewUser && <input type="text" onBlur={handleOnBLur} name="fullname" id="input-2" placeholder="Full name" required />
                    }

                    <input type="text" onBlur={handleOnBLur} name="email" id="input-3" placeholder="Email address" required />
                    <input type="password" onBlur={handleOnBLur} name="password" id="input-4" placeholder="Password" required />
                    {
                        isNewUser && <input type="password" onBlur={handleOnBLur} name="confirmPassword" id="input-5" placeholder="Confirm password" required />
                    }
                    {
                        isNewUser && <p style={{ color: 'red' }}>{validPassword.isValidPassword ? validPassword.isPasswordMatch : validPassword.isValidPasswordMessage}</p>
                    }
                    <input id="submit-btn" type="submit" value="Submit" />
                    <Button className="signing-btn" variant="light" onClick={handleGoogleSignIn}><img className="btn-icon" src={googleIcon} alt="" /><span className="btn-txt"> Continue with Google</span></Button>
                    <Button className="signing-btn" variant="light" onClick={handleFacebookSignIn}><img className="btn-icon" src={facebookIcon} alt="" /> <span className="btn-txt"> Continue with Facebook</span></Button>
                </form>
            </div>
        </div>
    );
};

export default Login;