import React from 'react';
import NavbarAdmin from '../Navbar/NavbarAdmin';
import "./style.css";

const AdminInbox = () => {
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