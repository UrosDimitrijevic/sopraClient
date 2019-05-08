import React from "react";
import styled from "styled-components";
import {BaseContainer} from "../../helpers/layout";
import {getDomain} from "../../helpers/getDomain";
import {Spinner} from "../../views/design/Spinner";
import {Button} from "../../views/design/Button";
import {withRouter} from "react-router-dom";
import {ErrorCode} from "../shared/ErrorHandler/ErrorHandler";
import {declineChallenge} from "./declineChallenge";
import "./ModalChallenge.css";
import Modal from "./ModalClass";


const Container = styled(BaseContainer)`
  color: white;
  text-align: center;

`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


const PlContainer = styled.div`
  margin: 6px 0;
  width: 280px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: 1px solid #ffffff26;
  background: darkgrey;
`;

/*const PlUserName = styled.div`
  font-weight: lighter;
  margin-left: 5px;
`;
*/


const PlId = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null,
            user: null,
            challenging: null,
            challengingPUT: null,
            gettingChallengedBy: null,
            status: null,
            isShowing: false,
        };
    }
    openModalHandler = () => {
       this.setState({
           isShowing: true
       });
    };
    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
        declineChallenge();
        this.timer = setInterval(() => this.ChallengeStatus(), 10000);
    };

    confirm123() {
        var confirm = window.confirm("UserID: " + localStorage.getItem("gettingChallengedByID") + " is challenging you");
        if (confirm) {
            console.log("confirm");
            this.accept();
            clearInterval(this.timer);
            this.getGameStatus();
            this.timer = setInterval(() => this.getGameStatus(), 10000);

        } else {
            declineChallenge();
            console.log("decline");
        }
    }

    accept() {
        let challengingPUT1 = this.state.challengingPUT;
        var gettingChallengedBy1 = this.state.gettingChallengedBy;
        console.log(challengingPUT1);
        console.log(gettingChallengedBy1);

        fetch(`${getDomain()}/users/` + localStorage.getItem("id"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                challenging: localStorage.getItem("gettingChallengedByID")

            })
        }).then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(ErrorCode(response.status));
            }

        })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                }
            });
    }


    ChallengeStatus() {
        fetch(`${getDomain()}/users/` + localStorage.getItem("id"), {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then(response => {
                this.setState({
                    challenging: response.challenging,
                    gettingChallengedBy: response.gettingChallengedBy
                });
                localStorage.setItem("gettingChallengedByID", response.gettingChallengedBy);

                if (this.state.gettingChallengedBy !== null && localStorage.getItem("gettingChallengedByID") !== localStorage.getItem("challengeID") && (localStorage.getItem("gettingChallengedByID"))) {

                    this.openModalHandler();
                    clearInterval(this.timer);
                }

                if (localStorage.getItem("gettingChallengedByID") === localStorage.getItem("challengeID")) {
                    this.getGameStatus();

                }

            });
    }


    challengeUser() {
        let challengingPUT1 = this.state.challengingPUT;
        var gettingChallengedBy1 = this.state.gettingChallengedBy;
        console.log(challengingPUT1);
        console.log(gettingChallengedBy1);

        fetch(`${getDomain()}/users/` + localStorage.getItem("id"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                challenging: localStorage.getItem("challengeID"),
                gettingChallengedBy: gettingChallengedBy1,
            })
        }).then(response => {
            if (response.status < 200 || response.status >= 300) {
                throw new Error(ErrorCode(response.status));
            }

        })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                }
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
                if (resStatus === 404 || resStatus === 400) {
                    console.log(res);
                    clearInterval(this.timer);
                    this.timer = setInterval(() => this.getGameStatus(), 2000);
                } else {
                    return res.json();
                }
            })
            .then(res => {
                switch (resStatus) {
                    case 200:
                        this.setState({status: res.status});
                        console.log(this.state.status);
                        if(res.status === "CHOSING_GAME_MODE"){
                            clearInterval(this.timer);
                            this.setState({
                                isShowing: false
                            });
                            this.props.history.push("/test");
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

    logout() {
        localStorage.removeItem("token");
        fetch(`${getDomain()}/users/` + localStorage.getItem("id"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),

            })
        })
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(ErrorCode(response.status));
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong loggin out: " + err);
            });
        this.props.history.push("/login");
        localStorage.clear();
        clearInterval(this.timer);
    }

    componentDidMount() {
        fetch(`${getDomain()}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async users => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({users});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });

        /*if (this.state.challenging === this.state.gettingChallengedBy && (this.state.gettingChallengedBy !== null) && (this.state.challenging) !== null) {
            this.getGameStatus();
            this.timer = setInterval(() => this.getGameStatus(), 10000);
        } */
        if (localStorage.getItem("id") !== null) {
            this.ChallengeStatus();
            console.log(this.state.gettingChallengedBy + " getting challenged by on mount");
            this.timer = setInterval(() => this.ChallengeStatus(), 10000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    declineWithModal = ()=>{
        declineChallenge();
        this.closeModalHandler()
    };
    acceptWithModal = ()=>{
       this.accept();
        clearInterval(this.timer);
        this.timer = setInterval(() => this.getGameStatus(), 5000);

        //this.props.history.push('/test');
    };

    render() {
        return (
            <div >{ this.state.isShowing ? <div className="back-drop"></div> : null }



                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}

                    accept={this.acceptWithModal}>
                    User with ID: {this.state.gettingChallengedBy} challenged yodfu!
                </Modal>
                <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>

            <Container>

                <h2>Happy Coding! </h2>
                {!this.state.users ? (
                    <Spinner/>
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <PlContainer>
                                            <a href="#" onClick={() => {
                                                this.props.history.push('/playerPage');
                                                localStorage.setItem("atID", user.id);
                                            }}>
                                                {user.username}
                                            </a>
                                            <button
                                                onClick={() => {
                                                    localStorage.setItem("challengeID", user.id);
                                                    this.setState({challengingPUT: user.id});
                                                    this.challengeUser();
                                                    console.log(this.state.challengingPUT + " state");
                                                    console.log(localStorage.getItem("challengeID") + " local")

                                                }}
                                                disabled={user.id.toString() === localStorage.getItem("id")}>Challenge
                                            </button>
                                            <PlId>Id: {user.id}</PlId>
                                        </PlContainer>
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                        <Button
                            width="10%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </Button>

                    </div>

                )}


            </Container> </div>


        );
    }
}

export default withRouter(Game);
/**
 <Player user ={user} />
 **/
