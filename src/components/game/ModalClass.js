import React from "react";
import "./ModalChallenge.css";
import { Redirect, Route } from "react-router-dom";
import Modal from "./Game";

const modal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                 style={{
                     transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0'
                 }}>
                <div className="modal-header">
                    <h3>CHALLENGE</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                    <p>
                        Do you accept or decline?
                    </p>
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={props.close}>Decline</button>
                    <button className="btn-continue" onClick={props.accept} >Accept</button>
                </div>
            </div>
        </div>
    )
};

export default modal;