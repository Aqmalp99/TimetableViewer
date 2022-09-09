import React, {useState} from "react";
import { Button } from "react-bootstrap";
import './Tmc.css';

const Tmc = ({showTmc, setShowTmc}) =>{
    return (
        <>
        {showTmc ? (
            <div className="tmc-window">
                <div className="overlay">
                    <div className="tmc-content">
                        <div className="tmc-text">
                        <br/>
                        <h3>Terms And Conditions </h3>
                        <br/>
                        <ol>
                            <li class="_3x94 _52io _3m9"><strong>The Service we provide</strong>
                            <ul>
                            <li class="_3x94 _52io _3m9">Our mission is to give people the power to build community and bring the world closer together. To help advance this mission, we provide the products and services described below to you</li>
                            <li class="_3x94 _52io _3m9">We don't sell your personal data to advertisers, and we don't share information that directly identifies you (such as your name, email address or other contact information) with advertisers unless you give us specific permission. Instead, advertisers can tell us things such as the kind of audience that they want to see their ads, and we show those ads to people who may be interested.</li>
                            </ul>
                            </li>
                            <li><strong>What kinds of information do we collect?</strong>
                            <ul>
                            <li>Depending on which Services you use, we collect different kinds of information from or about you</li>
                            <li>We also collect content and information that other people provide when they use our Services, including information about you, such as when they share a photo of you, send a message to you or upload, sync or import your contact information.</li>
                            <li>We collect information from or about the computers, phones or other devices where you install or access our Services, depending on the permissions you've granted. We may associate the information we collect from your different devices, which helps us provide consistent Services across your devices. Here are some examples of the device information that we collect</li>
                            </ul>
                            </li>
                         </ol>

                        </div>
                        
                        <Button className="tmc-btn" variant="danger" onClick=
                        {() => setShowTmc (prev => !prev)}> 
                        Close
                        </Button>
                    </div>
                    
                </div>
            </div>
        ) : null}
        
        </>
    );
}

export default Tmc;