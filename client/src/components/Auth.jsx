import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  userName: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
}

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { userName, password, phoneNumber, avatarURL } = form;

    const URL = 'http://localhost:5000/auth';

    const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup': 'login'}`, { 
      userName, password, fullName: form.fullName, phoneNumber, avatarURL,
    });

    cookies.set('token', token);
    cookies.set('userName', userName);
    cookies.set('fullName', fullName);
    cookies.set('userId', userId);

    if(isSignup) {
      cookies.set('phoneNumber', phoneNumber);
      cookies.set('avatarURL', avatarURL);
      cookies.set('hashedPassword', hashedPassword);
    }

    window.location.reload();
  }

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
          <p>{isSignup ? '회원가입' : '로그인'}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <lebel htmlFor="fullName">이름</lebel>
                <input 
                  name="fullName"
                  type="text"
                  placeholder='이름'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
                <lebel htmlFor="userName">사용자 이름</lebel>
                <input 
                  name="userName"
                  type="text"
                  placeholder='사용자 이름'
                  onChange={handleChange}
                  required
                />
              </div>
              {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <lebel htmlFor="phoneNumber">전화번호</lebel>
                <input 
                  name="phoneNumber"
                  type="text"
                  placeholder='전화번호'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <lebel htmlFor="avatarURL">프로필 URL</lebel>
                <input 
                  name="avatarURL"
                  type="text"
                  placeholder='프로필 URL'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_input'>
                <lebel htmlFor="password">비밀번호</lebel>
                <input 
                  name="password"
                  type="password"
                  placeholder='비밀번호'
                  onChange={handleChange}
                  required
                />
            </div>
            {isSignup && (
              <div className='auth__form-container_fields-content_input'>
                <lebel htmlFor="confirmPassword">비밀번호 확인</lebel>
                <input 
                  name="confirmPassword"
                  type="password"
                  placeholder='비밀번호 확인'
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className='auth__form-container_fields-content_button'>
              <button>{isSignup ? "회원가입" : "로그인"}</button>
            </div>
          </form>
          <div className='auth__form-container_fields-account'>
            <p>
              {isSignup 
                ? "계정이 이미 있습니까? "
                : "계정이 없습니까? " 
              }
            </p>
            <span onClick={switchMode}>
              {isSignup ? ' 로그인' : ' 회원가입'}
            </span>
          </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
        <img src={signinImage} alt="sign in"/>
      </div>
    </div>
  );
}

export default Auth;
