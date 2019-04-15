import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import {ErrorCode} from "../shared/ErrorHandler/ErrorHandler"
//import Player from "../../views/Player";




const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height:400px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;




const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Container = styled.div`
  margin: 6px 0;
  width: 860px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
  background: darkgrey;
`;

const UserName = styled.div`
  margin-left: auto;
  margin-right: 10px;
  margin-left: 5px;
`;

const Id = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const Status = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const Birthday = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;

const CreationDate = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;




class PlayerPage extends React.Component {


    constructor() { var us = new User( {
        "username" : "Loading",
        "id": 0,
        "status": "Loading"
    } );
        super();
        this.state = {
            user: us
        };
    }

    backTomain(){
        localStorage.removeItem("lookingAtUser");
        this.props.history.push(`/game`);
    }

    editPage(){
        this.props.history.push(`/PlayerPageEdit`);
    }

    getUser(){
        var id = localStorage.getItem("atID");
        fetch(`${getDomain()}/users/`+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if( response.status < 200 || response.status >= 300 ) {
                throw new Error( ErrorCode(response.status) );
            }
            return response.json() })
            .then(returnedUser => {
                const user = new User(returnedUser);
                this.setState({"user": user});
                // store the token into the local storage
                this.forceUpdate();
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });

    }
    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }


    componentWillMount() {
        var id = localStorage.getItem("atID");
        fetch(`${getDomain()}/users/`+id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if( response.status < 200 || response.status >= 300 ) {
                throw new Error( ErrorCode(response.status) );
            }
            return response.json() })
            .then(async returnedUser => {
                //await new Promise(resolve => setTimeout(resolve, 100));
                const user = new User(returnedUser);
                this.setState({"user": user});
                // store the token into the local storage
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }


    render() {
        let button;
        if(localStorage.getItem("atID") === localStorage.getItem("id")){
            button =
                <Button
                    width="50%"
                    onClick={() => {
                        this.editPage();
                    }}>
                edit site
            </Button>;

        }

        return (
            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Container>
                            <UserName>User: {this.state.user.username}</UserName>
                            <Birthday>Birthday: {this.state.user.birthday} </Birthday>
                            <Id>Id: {this.state.user.id}</Id>
                            <CreationDate>CreationDate: {this.state.user.creationDate} </CreationDate>
                            <Status>Status: {this.state.user.status}</Status>
                        </Container>
                    </Form>
                    <ButtonContainer>
                        <Button
                            width="50%"
                            onClick={() => {
                                this.backTomain();
                            }}
                        >
                            Return to main Page
                        </Button>
                        {button}
                    </ButtonContainer>
                </FormContainer>
            </BaseContainer>
        );

    }
}


export default withRouter(PlayerPage);
