import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import "../../GodCards/img_text.css";
import data from "../../GodCards/data";
import Card from '../../GodCards/Card';
import Cardtable from "../../GodCards/Card2"
import {Button} from "../../views/design/Button";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

class TwoGodCards extends React.Component {

    constructor() {
        super();
        this.state = {
            status: null,
            actions: [],
            myUserId: 1,
            board: 123,
            index: 0,
            starting: false,
            GodCard1: 2,
            GodCard2: 1,
            property1: data.properties[2],
            property2: data.properties[3],
            properties: data.properties,
            property: data.properties[2]
        };
    }



    chooseGoD = () => {
        const godIndex = this.state.property.index;
        console.log(this.state.GodCard1);
        console.log(this.state.GodCard2);
        console.log(this.state.actions);
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
    getActionID(){
        var actions = this.state.actions;
        var number1 = this.state.GodCard1+1;
        var number2 = this.state.GodCard2+1;

        if (actions.length>1){
            for (let i = 0; i<actions.length; i++ ){
                if ((actions[i].god1.godnumber === number1 || actions[i].god1.godnumber === number2) && (actions[i].god2.godnumber === number1 || actions[i].god2.godnumber === number2)){
                    localStorage.setItem("actionID", actions[i].id);
                    console.log(localStorage.getItem("actionID"));
                    break;
                }
            }
        }
    }

    choose2GodCards() {             // somewhat implemented
        fetch(`${getDomain()}/game/actions/`+ localStorage.getItem("actionID"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }

        })
            .then(response => {
                if(!(response.status === 201)) { //201
                    console.log(`ERROR: Username already existing  ${this.state.username} with CONFLICT`);
                    alert("Username taken");
                    window.location.reload();

                }

                else {

                    localStorage.removeItem("actionID");
                    //push this.props.history("link")
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

            });
        this.getActions();
    }


    render() {
        const {property} = this.state;
        return (

            <BaseContainer>
                <FormContainer>



                    <div>{Cardtable(this.state.property1,this.state.property2)}


                    </div>
                    <br/>
                    <div className={"row2"} >
                    <div>
                        <div className={"column2"}> <button
                            onClick={() => this.chooseGoD()
                            }
                            //disabled={property.index === this.state.GodCard1 || property.index === this.state.GodCard2 || (this.state.GodCard1 !== null && this.state.GodCard2 !== null)}
                        >Choose</button></div>
                        <div  className={"column2"}><button
                            onClick={() => this.unChooseGoD()}
                            disabled={property.index !== this.state.GodCard1 && property.index !== this.state.GodCard2}
                        >Unchoose</button></div>

                    </div></div><br/>
                    <div className={"row3"} ><Button size={100}
                        disabled={this.state.GodCard1 === null || this.state.GodCard2 === null}
                        onClick = { () => {
                            this.getActionID();
                            console.log(this.state.GodCard1)
                        }}

                    > Accept</Button></div>

                </FormContainer>
            </BaseContainer>
        );
    }
    getActions() {
        let resStatus = 0;
        fetch(`${getDomain()}/game/actions/`+ localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                resStatus = res.status;
                if (resStatus === 404 || resStatus === 400) {
                    console.log(res)
                } else {
                    return res.json();
                }
            })
            .then(res => {
                switch (resStatus) {
                    case 200:
                        if (res.length>1){
                        this.setState({
                            actions: res,
                            GodCard1: res[0].myGod.godnumber,
                            GodCard2: res[1].myGod.godnumber,
                            property: data.properties[res[0].myGod.godnumber],
                        })}
                        break;

                    case 500:
                        console.log('server error, try again');
                        break;
                    default:
                        console.log("default case");
                        break;

                }

            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong catching challenge Status: " + err);
            });
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(TwoGodCards);