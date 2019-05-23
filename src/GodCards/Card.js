import React from 'react';
import PropTypes from 'prop-types';
import "./img_text.css";

const Card = ({property}) => {
    const {index, picture, text, title, } = property;
    return (
        <div id={`card-${index}`} className="myRow">
            <div className="myColumnImg">
                    <img src={picture}
                         alt={`s`}
                         width={250} // should be in ratio 1:1.75
                         height={437.5}/>


            </div>
            <div className="myColumnText">

                <b>{title}</b><p>{text}</p>
        </div>


        </div>
    )
};

Card.propTypes = {
    property: PropTypes.object.isRequired
};

export default Card;