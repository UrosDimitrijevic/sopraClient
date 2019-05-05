import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { withRouter } from "react-router-dom";
import "../../GodCards/img_text.css";
import data from "../../GodCards/data";
import Card from '../../GodCards/Card';
import {Button} from "../../views/design/Button";
import GameBoardStatus, {getGameStatus} from "./getGameStatus"


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
            actions: [],
            myUserId: 1,
            board: 123,
            index: 0,
            firstID: null,
            secondID: null,
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
    chooseMode(choice){fetch(`${getDomain()}/game/actions/`+ choice, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }

    })
        .then(response => {
            if(!(response.status === 201)) { //201
                console.log(`ERROR: Username already existing  ${this.state.username} with CONFLICT`);
               console.log(this.state.secondID);
                console.log(this.state.firstID);
                window.location.reload();

            }

            else {

                localStorage.removeItem("actionID");
                //push this.props.history("link")
            }
        })

    }

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
    getActionID(){
        var actions = this.state.actions;
        var number1 = this.state.GodCard1+1;
        var number2 = this.state.GodCard2+1;

        if (actions.length>40){
            for (let i = 0; i<actions.length; i++ ){
                if ((actions[i].god1.godnumber === number1 || actions[i].god1.godnumber === number2) && (actions[i].god2.godnumber === number1 || actions[i].god2.godnumber === number2)){
                    localStorage.setItem("actionID", actions[i].id);
                    console.log(localStorage.getItem("actionID"));

                    break;
                }
            }
        }
        if(localStorage.getItem("actionID")){
            this.choose2GodCards();
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
                if((response.status === 201)) { //201
                    console.log(`ERROR: Username already existing  ${this.state.username} with CONFLICT`);



                }

                else {

                    localStorage.removeItem("actionID");
                    //push this.props.history("link")
                    clearInterval(this.timer);

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
    }



    componentDidMount() {
        fetch(`${getDomain()}/game/Board/`+ localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then( response => {
                console.log(response.board);

            });

        this.getActions();
        this.timer = setInterval(() => this.getActions(), 5000);
    }

    render() {
        const {property} = this.state;
        return (

            <BaseContainer>
                <FormContainer>
                    <p className={"status"} >{this.state.status}</p>
                    <button disabled={this.state.actions.length !== 2} onClick={()=> this.chooseMode(this.state.secondID)}>Default Mode</button>
                    <button disabled={this.state.actions.length !== 2} onClick={()=> this.chooseMode(this.state.firstID)}>GodMode</button>
                    <Card property={property} />
                    <div>
                        <button className={"myButton"}
                            onClick={() => this.prevProperty()}
                            disabled={property.index === 0}
                        >Prev</button>
                    <button className={"myButton"}
                        onClick={() => this.nextProperty()}
                        disabled={property.index === data.properties.length-1}
                    >Next</button>
                        </div>
                <br/>

                    <div>
                    <button className={"myButton"}
                        onClick={() => this.chooseGoD()
                        }
                        disabled={property.index === this.state.GodCard1 || property.index === this.state.GodCard2 || (this.state.GodCard1 !== null && this.state.GodCard2 !== null) || this.state.actions<2}
                    >Choose</button>
                        <button className={"myButton"}
                            onClick={() => this.unChooseGoD()}
                            disabled={property.index !== this.state.GodCard1 && property.index !== this.state.GodCard2 }
                        >Unchoose</button>

                    </div>
                    <Button
                    disabled={this.state.GodCard1 === null || this.state.GodCard2 === null || this.state.actions.length<1}
                    onClick = { () => {
                        this.getActionID();
                        console.log(this.state.actions);



                    }}

                    > Accept</Button>

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
                        this.getGameStatus();
                        if(res.length===2){
                        this.setState({
                            actions: res,
                            firstID: res[0].id,
                            secondID: res[1].id,
                        });}
                        else if(res.length>2){
                            this.setState({
                            actions: res}
                            )}
                        else{
                            this.setState({
                                actions: res,

                            });}
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
    getGameStatus() {
        let resStatus = 0;
        fetch(`${getDomain()}/game/Board/`+localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then (res => {
                resStatus = res.status;
                if (resStatus === 404 || resStatus === 400 || resStatus !==200){console.log(res)}
                else{
                    return  res.json();}
            })
            .then (res => {
                switch (resStatus){
                    case 200:
                        this.setState({status: res.status});
                        if(res.status === "SettingFigurinesp1f1"){
                            clearInterval(this.timer);
                            this.props.history.push("/newboard")
                        }
                        if(res.status === "CHOSING_GAME_MODE"){
                            this.props.history.push("/test")
                        }
                        if(res.status === "CHOSING_GODCARDS"){
                            this.props.history.push("/test")
                        }
                        if(res.status === "PICKING_GODCARDS"){
                            this.props.history.push("/test2")
                        }

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
    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(ChooseGodCard);