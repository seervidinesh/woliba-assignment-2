import React, { useState, useEffect } from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { Modal } from './modal';
import { Signup } from './signup';
import { Login } from './login';
import { userLogin, logout, userData } from './api'
import { FeedCard } from './feed';
import { CreateFeed } from './feed/feedCreate'

const App = () => {
  const [isSignUpModal, setSignUpModal] = useState(false);
  const [isLoginModal, setLoginModal] = useState(false);
  const [inputValue, setInputValue] = useState({ username: "", password: "" });
  const [user, setUser] = useState({ email: '', roles: [''] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [feedModal, setFeedModal] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showModal = (type) => {
    type === 'SIGNUP' ? setSignUpModal(true) : setLoginModal(true);
  };
  const handleOk = (type) => {
    type === 'SIGNUP' ? setSignUpModal(false) : setLoginModal(false);
  };
  const handleCancel = (type) => {
    type === 'SIGNUP' ? setSignUpModal(false) : setLoginModal(false);
  };
  const handleLogout = async () => {
    await logout();
    setUser({ email: '', roles: [] });
    setIsLoggedIn(false);
    setUserName('');
  }

  const createFeed = async () => {
    setFeedModal(true);
  }
  
  const closeFeedModal = async () => {
    setFeedModal(false);
  }
  
  const handleLogin = async (event) => {
    event.preventDefault();
    let res;
    try {
      res = await userLogin(inputValue);
      if (res.status === 200) {
        setUserName(res.data.username);
        setIsLoggedIn(true);
        alert('Login success');
        handleCancel();
      } else {
        alert(res.data.error.message ? res.data.error?.message : res.data);
      }
    } catch (error) {
      alert('Something went wrong!');
    }
  }

  const fetchUserDetails = async () => {
    try {
      const res = await userData();
      if (res.status === 200) {
        setUser({ email: res.data.email, roles: res.data.roles });
        setUserName(res.data.username);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log('first')
    }
  }

  useEffect(() => {
    try {
      fetchUserDetails();
    } catch (error) {
      console.log('first')
    }
  }, [isLoggedIn, userName]);

  return (
    <div className="App">
      <Navbar showModal={showModal} userName={user.email} handleLogout={handleLogout} createFeed={createFeed} />
      <Modal handleOk={() => handleOk("SIGNUP")} isModalOpen={isSignUpModal} handleCancel={() => handleCancel('SIGNUP')}>
        <Signup closeModal={() => handleCancel('SIGNUP')} />
      </Modal>
      {/* feed modal */}
      <Modal handleOk={() => handleOk("SIGNUP")} isModalOpen={feedModal} handleCancel={() => closeFeedModal()}>
        <CreateFeed closeModal={() => closeFeedModal()} />
      </Modal>
      <Modal handleOk={handleOk} isModalOpen={isLoginModal} handleCancel={handleCancel}>
        <Login handleLogin={handleLogin} handleChange={handleChange} inputValue={inputValue} />
      </Modal>
      { isLoggedIn ? <FeedCard user={user} openEditModal={() => {
        setFeedModal(true);
      }}/> : '' }
      <Footer />
    </div>
  )
}
export default App;
