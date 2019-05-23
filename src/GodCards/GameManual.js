import React from "react";
import styled from "styled-components";
//import { BaseContainer } from "../../helpers/layout";
//import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
//import "../../GodCards/img_text.css";
//import data from "../../GodCards/data";
//import Card from '../../GodCards/Card';
//import {Button} from "../../views/design/Button";
import Manual from "./game_manual.pdf";


const ManualContainer = styled.div`
  height:100% !important;
  width:100% !important;
  overflow:auto;
`;

class GameManual extends React.Component {
    render(){
        return (
            <ManualContainer>
                <object  data = {Manual} style={{width: "100%", height:1000, display:"flex"}}>Game manual for Santorini</object>
            </ManualContainer>
        )}
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(GameManual);
