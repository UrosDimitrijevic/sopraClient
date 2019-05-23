import React from "react";
import "./ModalWonLost.css";


const WonLostModal = (props) => {
    var result = props.result;
    var header = "modal-header2"+result;
    var footer = "modal-footer2"+result;
    return (
        <div>
            <div className="modal-wrapper2"
                 style={{
                     transform: props.show ? 'translateY(0vh)' : 'translateY(100vh)',
                     opacity: props.show ? '1' : '0'
                 }}>
                <div className={header}>
                    <h3>You {result} !</h3>
                </div>
                <div className="modal-body2">
                    <p>
                        {props.children}
                    </p>
                </div>
                <div className={footer}>

                    <button className="btn-dashboard2" onClick={props.endGame}>Back To Dashboard</button>

                </div>
            </div>
        </div>
    )
};

export default WonLostModal;

//<span className="close-modal-btn2" onClick={props.close}>×</span>                            <button className="btn-continue2" onClick={props.accept} >Accept</button>             <button className="btn-cancel2" onClick={props.close}>Decline</button>