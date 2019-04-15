import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import "../../GodCards/img_text.css";
import data from "../../GodCards/data";
import Card from '../../GodCards/Card';
import {Button} from "../../views/design/Button";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

class ChooseGodCard extends React.Component {

    constructor() {
        super();
        this.state = {
           status: null,
            myUserId: 1,
            board: 123,
            index: 0,
            starting: false,
            GodCard1: null,
            GodCard2: null,
            properties: data.properties,
            property: data.properties[0]
        };
    }

    nextProperty = () => {
        const newIndex = this.state.property.index+1;
        this.setState({
            property: data.properties[newIndex]
        })
    };

    prevProperty = () => {
        const newIndex = this.state.property.index-1;
        this.setState({
            property: data.properties[newIndex]
        })
    };

    chooseGoD = () => {
        const godIndex = this.state.property.index;
        if(this.state.GodCard1 === null) {
            this.setState({
                GodCard1: godIndex,
            })
        }
        else{
            this.setState({
                GodCard2: godIndex,
            })
        }
    };
    unChooseGoD = () => {
        const godIndex = this.state.property.index;
        if (this.state.GodCard1 === godIndex){
            this.setState({
                GodCard1 : null
            })
        }
        else if(this.state.GodCard2 === godIndex){
            this.setState({
                GodCard2 : null
            })
        }

    };

    choose2GodCards() {             // somewhat implemented
        fetch(`${getDomain()}//users/MyGame/`+ localStorage.getItem("id"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: this.state.GodCard1,
                username: this.state.GodCard2,

            })
        })
            .then(response => {
                if(!(response.status === 201)) { //201
                    console.log(`ERROR: Username already existing  ${this.state.username} with CONFLICT`);
                    alert("Username taken");
                    window.location.reload();

                }

                else {

                    this.setState({registered: true});
                    return response;
                }
            })

            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server  cannot be reached. Did you start it?");
                } else {
                    alert(`Something  went wrong during the registration: ${err.message}`);
                    window.location.reload();
                }
            })


            .then(() => {
                if(this.state.registered) {
                    this.props.history.push('/login');
                }
            })
            .then(() => {
                if(this.state.registered) {
                    alert("Registration successful. Log in please");
                }
            })
    }



    componentDidMount() {
        fetch(`${getDomain()}/game/Board/`+ localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then( response => {console.log(response.board);

            })
    }


    render() {
        const {property} = this.state;
        return (

            <BaseContainer>
                <FormContainer>

                    <Card property={property} />
                    <div>
                        <button
                            onClick={() => this.prevProperty()}
                            disabled={property.index === 0}
                        >Prev</button>
                    <button
                        onClick={() => this.nextProperty()}
                        disabled={property.index === data.properties.length-1}
                    >Next</button>
                        </div>
                <br/>

                    <div>
                    <button
                        onClick={() => this.chooseGoD()
                        }
                        disabled={property.index === this.state.GodCard1 || property.index === this.state.GodCard2 || (this.state.GodCard1 !== null && this.state.GodCard2 !== null)}
                    >Choose</button>
                        <button
                            onClick={() => this.unChooseGoD()}
                            disabled={property.index !== this.state.GodCard1 && property.index !== this.state.GodCard2}
                        >Unchoose</button>

                    </div>
                    <Button
                    disabled={this.state.GodCard1 === null || this.state.GodCard2 === null}
                    > Accept</Button>
                    <p>{this.state.board}</p>
                </FormContainer>
            </BaseContainer>
        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(ChooseGodCard);