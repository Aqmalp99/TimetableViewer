import React, {Component} from 'react';
import axios from 'axios';

class ChangeClassDetails extends Component{

    handleSubmit(e){
        e.preventDefault();
        const name = document.getElementById('name').value;
        //const email = document.getElementById('email').value;
        const date_time = document.getElementById('date_time').value;
        const venue = document.getElementById('venue').value;
        const class_type = document.getElementById('class_type').value;
        const message = document.getElementById('message').value;
        axios({
            method: "POST", 
            url:"/send",
            data: {
                name: name,
                date_time: date_time,
                venue: venue,
                class_type: class_type,
                message: message,
            }
        }).then((response)=>{
            if (response.data.msg === 'success'){
                alert("Message Sent."); 
                this.resetForm()
            }else if(response.data.msg === 'fail'){
                alert("Message failed to send.");
                console.log(response.data);
            }
        })
    }

    resetForm(){
        document.getElementById('contact-form').reset();
    }

    render(){
        return(
            <div className="col-sm-4 offset-sm-4">
                <h3>Class Details</h3>
                <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date and time">Date and Time</label>
                        <input type="text" className="form-control" id="date_time" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="venue">Venue</label>
                        <input type="text" className="form-control" id="venue" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="class_type">Class Type</label>
                        <input type="text" className="form-control" id="class_type" />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea className="form-control" rows="5" id="message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default ChangeClassDetails; 