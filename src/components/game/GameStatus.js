import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import "../../GodCards/img_text.css";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

class GameStatus extends React.Component {

    constructor() {
        super();
        this.state = {
            status: null,
        };
    }
    componentDidMount() {
        fetch(`${getDomain()}/game/Board/`+ localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then( response => {this.setState({status : response.status});
            console.log(this.state.status);
            })
    }
    render() {
        return (
            <BaseContainer>
                <FormContainer>

                </FormContainer>
            </BaseContainer>
        );
    }
}

export default withRouter(GameStatus);