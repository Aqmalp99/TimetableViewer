import React, {useEffect, useState} from 'react';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import "./style.css";
import io from "socket.io-client";
import ClashList from './ClashList';

// const socket = io("/", {
// //   query: {
// //       id: id,
// //   }
// });

const AdminInbox = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(0);
    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         // setMessages((messages) => ([...messages, data.messageData]));
    //         console.log(data);
    //     })
    // }, [socket]);

    const messageContent = () => {
        return (<div>
            <p>Student a1747701 has enrolled in a class that causes a clash.</p>
            <p>Below are the details of this clash</p>
            {/* {messages[selectedMessage].clashes.map} */}
        </div>)
    }


    return (<>
        <NavbarAdmin />
        <h1>Admin Inbox!</h1>
        <div className='inbox-wrapper'>
            <div className="inbox-flex">
                <div className='inbox-list'>
                    <ClashList />
                </div>
                <div className='message-display'>
                    {messageContent()}
                </div>
            </div>
        </div>
    </>)
}

export default AdminInbox;