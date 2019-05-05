import React from "react";
import "./ModalWonLost.css";


const WonLostModal = (props) => {
    return (
        <div>
            <div className="modal-wrapper"
                 style={{
                     transform: props.show ? 'translateY(0vh)' : 'translateY(100vh)',
                     opacity: props.show ? '1' : '0'
                 }}>
                <div className="modal-header">
                    <h3>You lost/won!</h3>
                    <span className="close-modal-btn" onClick={props.close}>×</span>
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>
                    <p>
                        {props.status}
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

export default WonLostModal;