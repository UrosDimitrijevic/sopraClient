import React from 'react';
import PropTypes from 'prop-types';
import "./img_text.css";

const Card = ({property}) => {
    const {index, picture, text, } = property;
    return (
        <div id={`card-${index}`} className="center">
            <div className="home2">
                <div className="home2_first">
                    <img src={picture}
                         width={250} // should be in ratio 1:1.75
                         height={437.5}/>

                </div>
            </div>
            <div className="home2">
            <div className="home2_second">
                <p>{text}</p>
            </div>
        </div>


        </div>
    )
};

Card.propTypes = {
    property: PropTypes.object.isRequired
};

export default Card;