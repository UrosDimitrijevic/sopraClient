import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import "../../GodCards/img_text.css";
import data from "../../GodCards/data";
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
            board: 123,
            index: 0,
            starting: false,
            GodCard1: 2,
            GodCard2: 1,
            property1: data.properties[5],
            property2: data.properties[6],
            properties: data.properties,
            property: data.properties[2],
            pick1: false,
            pick2: false,
        };
    }

    choose1from2Gods() {
        fetch(`${getDomain()}/game/`+localStorage.getItem("boardID")+`/actions/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: parseInt(localStorage.getItem("actionID"))
        })
            .then(response => {
                if ((response.status === 201)) { //201
                } else {
                    localStorage.removeItem("actionID");
                }
            })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server  cannot be reached. Did you start it? TEst2");
                } else {
                    alert(` Test2 Something  went wrong during the registration: ${err.message}`);
                    window.location.reload();
                }
            })
    }


    componentDidMount() {
        fetch(`${getDomain()}/game/Board/` + localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then(response => {
                console.log(response.board);

            });
        this.getActions();
        this.getGameStatus();
        this.timer = setInterval(() => this.getGameStatus(), 1000);
    }

    firstCard() {
        if (this.state.actions.length === 2) {
            this.setState({pick1: true, pick2: false});
            let actionsID = this.state.actions[0].id;
            localStorage.setItem("actionID", actionsID);
            console.log(localStorage.getItem("actionID"));

        }
    }

    secondCard() {
        if (this.state.actions.length === 2) {
            this.setState({pick1: false, pick2: true});
            let actionsID = this.state.actions[1].id;
            localStorage.setItem("actionID", actionsID);
            console.log(localStorage.getItem("actionID"));
        }
    }

    render() {
        return (
            <BaseContainer>
                <FormContainer>


                    <div>{Cardtable(this.state.property1, this.state.property2)}


                    </div>
                    <br/>
                    <div className={"row2"}>
                        <div>
                            <div className={"column2"}>
                                <button className={"myButton"}
                                        onClick={() => this.firstCard()}
                                        disabled={this.state.actions.length < 2 || this.state.pick1}
                                    //disabled={property.index === this.state.GodCard1 || property.index === this.state.GodCard2 || (this.state.GodCard1 !== null && this.state.GodCard2 !== null)}
                                >Choose
                                </button>
                            </div>
                            <div className={"column2"}>
                                <button className={"myButton"}
                                        onClick={() => this.secondCard()}
                                        disabled={this.state.actions.length < 2 || this.state.pick2}
                                >Choose
                                </button>
                            </div>

                        </div>
                    </div>
                    <br/>
                    <div className={"row3"}><Button size={100}
                                                    disabled={this.state.GodCard1 === null || this.state.GodCard2 === null || !localStorage.getItem("actionID")}
                                                    onClick={() => {
                                                        this.choose1from2Gods();
                                                        console.log(this.state.GodCard1)
                                                    }}

                    > Accept</Button></div>
                </FormContainer>
            </BaseContainer>
        );
    }

    getActions() {
        let resStatus = 0;
        fetch(`${getDomain()}/game/actions/` + localStorage.getItem("id"), {
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
                        if (res.length === 2) {
                            this.setState({
                                actions: res,
                                GodCard1: res[0].myGod.godnumber,
                                GodCard2: res[1].myGod.godnumber,
                                property1: this.state.properties[res[0].myGod.godnumber - 1],
                                property2: data.properties[res[1].myGod.godnumber - 1],
                                property: data.properties[res[0].myGod.godnumber],
                            });
                        }
                        else if (res.length === 0 && this.state.status === "PICKING_GODCARDS") {
                            var number1 = localStorage.getItem("god1");
                            var number2 = localStorage.getItem("god2");

                            this.setState({
                                property1: this.state.properties[parseInt(number1) - 1],
                                property2: data.properties[parseInt(number2) - 1]
                            })
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

    getGameStatus() {
        let resStatus = 0;
        fetch(`${getDomain()}/game/Board/` + localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                resStatus = res.status;
                if (resStatus === 404 || resStatus === 400 || resStatus !== 200) {
                    console.log(res)
                } else {
                    return res.json();
                }
            })
            .then(res => {
                switch (resStatus) {
                    case 200:
                        this.setState({status: res.status});
                        if (res.status === "SettingFigurinesp1f1") {
                            this.props.history.push("/Santorini")
                        }
                        if (res.status === "CHOSING_GAME_MODE") {
                            this.props.history.push("/gameMode")
                        }
                        if (res.status === "CHOSING_GODCARDS") {
                            this.props.history.push("/test")
                        }
                        if (res.status === "PICKING_GODCARDS") {
                           // this.props.history.push("/test2")
                        }

                        break;

                    case 500:
                        console.log('server error, try again');
                        break;
                    default:
                        console.log("default case");
                        break;

                }
                this.getActions();
            })


            .catch(err => {
                console.log(err);
                alert("Something went wrong twoGodCards: " + err);
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
export default withRouter(TwoGodCards);