import React from "react";
import "./ModalWonLost.css";


const WonLostModal = (props) => {
    return (
        <div>
            <div className="modal-wrapper2"
                 style={{
                     transform: props.show ? 'translateY(0vh)' : 'translateY(100vh)',
                     opacity: props.show ? '1' : '0'
                 }}>
                <div className="modal-header2">
                    <h3>You lost/won!</h3>
                    <span className="close-modal-btn2" onClick={props.close}>×</span>
                </div>
                <div className="modal-body2">
                    <p>
                        {props.children}
                    </p>
                    <p>
                        {props.status}
                    </p>
                </div>
                <div className="modal-footer2">
                    <button className="btn-cancel2" onClick={props.close}>Decline</button>
                    <button className="btn-continue2" onClick={props.accept} >Accept</button>
                </div>
            </div>
        </div>
    )
};

export default WonLostModal;