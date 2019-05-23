import React from "react";
import "./ModalChallenge.css";


const modal1 = (props) => {
    return (
        <div>
            <div className="modal-wrapper1"
                 style={{
                     transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                     opacity: props.show ? '1' : '0'
                 }}>
                <div className="modal-header1">
                    <h3>CHALLENGE</h3>
                    <span className="close-modal-btn1" onClick={props.close}>×</span>
                </div>
                <div className="modal-body1">
                    <p>
                        {props.children}
                    </p>
                    <p>
                        Do you accept or decline?
                    </p>
                </div>
                <div className="modal-footer1">
                    <button className="btn-cancel1" onClick={props.close}>Decline</button>
                    <button className="btn-continue1" onClick={props.accept} >Accept</button>
                </div>
            </div>
        </div>
    )
};

export default modal1;