import React from 'react';

import "./img_text.css";

function CardTable(property1, property2){
    return(
        <div className={"row1"}>
            <div className={"column1"}> <img src={property1.picture}
                                             alt={`f`}
                                             width={250} // should be in ratio 1:1.75
                                             height={437.5}/>
            </div>
            <div className={"column3"}> <b>{property1.title}</b><p>{property1.text}</p></div>
            <div className={"column1"}>  <img src={property2.picture}
                                              alt={`s`}
                                              width={250} // should be in ratio 1:1.75
                                              height={437.5}/></div>
            <div className={"column3"}> <b>{property2.title}</b><p>{property2.text}</p></div>
        </div>

    )
}



export default CardTable;