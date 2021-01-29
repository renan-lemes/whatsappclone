//C:\Users\Renan Lemes\OneDrive\Área de Trabalho\Dale\whatsappclone>npm start //

import React, { useState, useEffect } from 'react';
import './App.css';

import Api from './Api';

import ChatListitem from './components/ChatListitem';
import ChatIntro from './components/Chatintro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat'
import Login from './components/Login';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';


export default function App() {
  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(()=>{
    if(user !== null){
      let unsub = Api.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }

  if (user === null) {
    return (<Login onReceive={handleLoginData} />)
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          chatlist={chatlist}
          user={user}
          isShow={showNewChat}
        />
        <header>
          <img className="header--avatar" src={user.avatar} alt="" ></img>
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
          </div>
          <div onClick={() => handleNewChat()} className="header--btn">
            <ChatIcon style={{ color: '#919191' }} />
          </div>
          <div className="header--btn">
            <MoreVertIcon style={{ color: '#919191' }} />
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize="small" style={{ color: '#919191' }} />
            <input type="search" placeholder="Procurar ou começar uma nova conversa" />
          </div>
        </div>

        <div className="chatlist>">
          {chatlist.map((item, key) => (
            <ChatListitem
              key={key}
              data={item}
              active={activeChat.chatId === chatlist[key].chatId}
              onClick={setShowNewChat(chatlist[key])}
            />
          ))}
        </div>
      </div>
      <div className="contentarea" >
        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
            data={activeChat}
          />
        }
        {activeChat.ChatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  )
}