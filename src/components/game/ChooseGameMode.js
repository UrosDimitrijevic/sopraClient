import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {withRouter} from "react-router-dom";
import "../../GodCards/img_text.css";
import Bob from "../../GodCards/Bob.jpg"
import Zeus from "../../GodCards/Zeus.PNG";
import {Spinner} from "../../views/design/Spinner";


const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

class ChooseGameMode extends React.Component {

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
        };
    }


    chooseMode(choice) {
        fetch(`${getDomain()}/game/`+localStorage.getItem("boardID")+`/actions/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: choice

        })
            .then(response => {
                if (!(response.status === 201)) { //201
                    console.log(`ERROR: Username already existing  ${this.state.username} with CONFLICT`);
                    console.log(this.state.secondID);
                    console.log(this.state.firstID);

                } else {

                    localStorage.removeItem("actionID");

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
        this.timer = setInterval(() => this.getActions(), 1000);
    }

    displayOptions() {
        if (this.state.actions.length < 1) {
            return <div className={"status2"}><Spinner/>
                <div className={"status2"}>Waiting for Starting Player to choose mode</div>
            </div>
        } else {
            return <p className={"status2"}>Choose a Mode! <br/> Play as a Mortal or as a God?</p>
        }
    }

    render() {

        return (

            <BaseContainer>
                <FormContainer>
                    {this.displayOptions()}

                    <div className={"row2"}>
                        <button className={"columnMode"} disabled={this.state.actions.length < 1}
                                onClick={() => this.chooseMode(this.state.secondID)}><img alt={"Bob"} src={Bob}
                                                                                          height={350} width={250}/>
                        </button>
                        <button className={"columnMode"} disabled={this.state.actions.length < 1}
                                onClick={() => this.chooseMode(this.state.firstID)}><img alt={"Bob"} src={Zeus}
                                                                                         height={350} width={250}/>
                        </button>
                    </div>
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
                            this.props.history.push("/newboard")
                        }
                        if (res.status === "CHOSING_GAME_MODE") {
                            //this.props.history.push("/gameMode")
                        }
                        if (res.status === "CHOSING_GODCARDS") {
                            this.props.history.push("/test")
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
                alert("Something went wrong catching challenge Status: " + err);
            });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}

export default withRouter(ChooseGameMode);