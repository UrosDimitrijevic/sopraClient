import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import Apollo from "../../views/design/Apollo.PNG";

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: darkgrey;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(100, 100, 100, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(black);
  color: black;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
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
        };
        this.today = new Date();
    }


    backToLogin() {
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

    handleInputChange(key, value) {

        this.setState({ [key]: value });
    }

    componentDidMount() {}



    render() {
        return (
            <BaseContainer>
                <FormContainer>

                    <img src = {Apollo}
                         sizes = "50%"
                         alt="Apollo test"/>


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