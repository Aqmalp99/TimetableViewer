import React, {useEffect} from 'react';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import "./style.css";
import io from "socket.io-client";

const socket = io("/", {
//   query: {
//       id: id,
//   }
});

const AdminInbox = () => {

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // setMessages((messages) => ([...messages, data.messageData]));
            console.log(data);
        })
    }, [socket]);

    return (<>
        <NavbarAdmin />
        <h1>Admin Inbox!</h1>
        <div className='inbox-wrapper'>
            <div className="inbox-flex">
                <div className='inbox-list'></div>
                <div className='message-display'></div>
            </div>
        </div>
    </>)
}

export default AdminInbox;