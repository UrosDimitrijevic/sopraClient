import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import "../../GodCards/img_text.css";
import data from "../../GodCards/data";
import Card from '../../GodCards/Card';
import {Spinner} from "../../views/design/Spinner";


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;
const Button2 = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  float: right;
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 30px;
  border: none;
  margin-top: 5px;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;
const timeInterval = 500;

class ChooseGodCard extends React.Component {

    constructor() {
        super();
        this.state = {
            status: null,
            actions: [],
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
        const newIndex = this.state.property.index + 1;
        this.setState({
            property: data.properties[newIndex]
        })
    };

    prevProperty = () => {
        const newIndex = this.state.property.index - 1;
        this.setState({
            property: data.properties[newIndex]
        })
    };

    chooseGoD = () => {
        const godIndex = this.state.property.index;
        if (this.state.GodCard1 === null) {
            this.setState({
                GodCard1: godIndex,
            })
        } else {
            this.setState({
                GodCard2: godIndex,
            })
        }
    };
    unChooseGoD = () => {
        const godIndex = this.state.property.index;
        if (this.state.GodCard1 === godIndex) {
            this.setState({
                GodCard1: null
            })
        } else if (this.state.GodCard2 === godIndex) {
            this.setState({
                GodCard2: null
            })
        }

    };

    getActionID() {
        var actions = this.state.actions;
        var number1 = this.state.GodCard1 + 1;
        var number2 = this.state.GodCard2 + 1;

        if (actions.length > 40) {
            for (let i = 0; i < actions.length; i++) {
                if ((actions[i].god1.godnumber === number1 || actions[i].god1.godnumber === number2) && (actions[i].god2.godnumber === number1 || actions[i].god2.godnumber === number2)) {
                    localStorage.setItem("actionID", actions[i].id);
                    console.log(localStorage.getItem("actionID"));
                    localStorage.setItem("god1", number1);
                    localStorage.setItem("god2", number2);
                    break;
                }
            }
        }
        if (localStorage.getItem("actionID")) {
            this.choose2GodCards();
        }
    }

    choose2GodCards() {             // somewhat implemented
        fetch(`${getDomain()}/game/`+localStorage.getItem("boardID")+`/actions/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: parseInt(localStorage.getItem("actionID"))

        })
            .then(response => {
                if ((response.status === 201)) { //201
                    console.log(`ERROR: Username already existing  ${this.state.username} with CONFLICT`);


                } else {

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
        this.timer = setInterval(() => this.getActions(), timeInterval);
    }
    /*<button disabled={this.state.actions.length !== 2}
                            onClick={() => this.chooseMode(this.state.secondID)}>Default Mode
                    </button>
                    <button disabled={this.state.actions.length !== 2}
                            onClick={() => this.chooseMode(this.state.firstID)}>GodMode
                    </button> */
    giveStatus(){
        if(this.state.actions.length<1){
            return <div className={"spinner"}><Spinner/></div>
        }
        else{
            return <p className={"status2"}>Choose two Gods!</p>
        }
    }

    render() {
        const {property} = this.state;
        return (

            <BaseContainer>
                <FormContainer>
                    {this.giveStatus()}

                    <Card property={property}/>
                    <div>
                        <button className={"myButton"}
                                onClick={() => this.prevProperty()}
                                disabled={property.index === 0}
                        >Prev
                        </button>
                        <button className={"myButton"}
                                onClick={() => this.nextProperty()}
                                disabled={property.index === data.properties.length - 1}
                        >Next
                        </button>
                    </div>
                    <br/>

                    <div>
                        <button className={"myButton2"}
                                onClick={() => this.chooseGoD()
                                }
                                disabled={property.index === this.state.GodCard1 || property.index === this.state.GodCard2 || (this.state.GodCard1 !== null && this.state.GodCard2 !== null) || this.state.actions < 2}
                        >Choose
                        </button>
                        <button className={"myButton2"}
                                onClick={() => this.unChooseGoD()}
                                disabled={property.index !== this.state.GodCard1 && property.index !== this.state.GodCard2}
                        >Unchoose
                        </button>

                    </div>
                    <Button2
                        disabled={this.state.GodCard1 === null || this.state.GodCard2 === null || this.state.actions.length < 1}
                        onClick={() => {
                            this.getActionID();
                            console.log(this.state.actions);
                        }}
                    > Accept</Button2>

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
                        this.getGameStatus();
                        if (res.length === 2) {
                            this.setState({
                                actions: res,
                                firstID: res[0].id,
                                secondID: res[1].id,
                            });
                        } else if (res.length > 2) {
                            this.setState({
                                    actions: res
                                }
                            )
                        } else {
                            this.setState({
                                actions: res,

                            });
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
                            clearInterval(this.timer);
                            this.props.history.push("/Santorini")
                        }
                        if (res.status === "CHOSING_GAME_MODE") {
                            this.props.history.push("/gameMode")
                        }
                        if (res.status === "CHOSING_GODCARDS") {
                            //this.props.history.push("/test")
                        }
                        if (res.status === "PICKING_GODCARDS") {
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
                alert("Something went wrong ChooseGodCards: " + err);
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