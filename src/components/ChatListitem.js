import React, {useState, useEffect} from 'react';
import './ChatListitem.css';

export default function ChatListItem({ onClick, active, data }) {
    
    const [time, setTime] = useState('');

    useEffect(()=>{
        if(data.lastMessageDate > 0){
            let d = new Date(data.lastMessageDate.seconds *1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0'+hours : hours;
            minutes = minutes <10 ? '0'+minutes : minutes;
            setTime(`${hours}:${minutes}`);
        }
    },[data])

    return (
        <div
            className={`chatListitem ${active ? 'active' : ''}`}
            onClick={onClick}
        >
            <img className="chatListitem--avatar" src={data.image} alt="" />
            <div className="chatListitem--lines">
                <div className="chatListitem--line">
                    <div className="chatListitem--name">{data.title}</div>
                    <div className="chatListitem--date">{time}</div>
                </div>
                <div className="chatListitem--line">
                    <div className="chatListitem--lastMsg">
                        <p>{data.lastMessage}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}