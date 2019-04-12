import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import "../../GodCards/img_text.css";
import data from "../../GodCards/data";
import Card from '../../GodCards/Card';

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
            password: null,
            password2: null,
            username: null,
            dob: null,
            registered: false,
            index: 0,
            GodCard1: null,
            GodCard2: null,
            properties: data.properties,
            property: data.properties[0]
        };
        this.today = new Date();
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

    choose2GodCards() {             // not implemented yet
        fetch(`${getDomain()}/register`, { //register new user. send request and get response
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password: this.state.password,
                username: this.state.username,
                dob: this.state.dob
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



    componentDidMount() {}


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
                    <div>
                    <button
                        onClick={() => this.chooseGoD()
                        }
                        disabled={property.index === this.state.GodCard1 || property.index === this.state.GodCard2 || (this.state.GodCard1 !== null && this.state.GodCard2 !== null)}
                    >God1 {this.state.GodCard1} Choose</button>
                        <button
                            onClick={() => this.unChooseGoD()}
                            disabled={property.index !== this.state.GodCard1 && property.index !== this.state.GodCard2}
                        >God2 {this.state.GodCard2} Unchoose</button>

                    </div>

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