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

const Button1 = styled.button`
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
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.1 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;

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
  background: cadetblue;
`;
const PlId = styled.div`
  margin-left: auto;
  margin-right: 10px;
  font-weight: bold;
`;
const timeInterval = 100;

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
            offlineUsers: null,
            inGameUsers: null,
            onlineUsers: null,
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
        this.timer = setInterval(() => this.ChallengeStatus(), timeInterval);
    };

    accept() {
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
                this.state.users.map(user => {
                    if (user.id === response.gettingChallengedBy) {
                        localStorage.setItem("opponentName", user.username);
                    }
                });
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
                    this.timer = setInterval(() => this.getGameStatus(), timeInterval);
                } else {
                    return res.json();
                }
            })
            .then(res => {
                switch (resStatus) {
                    case 200:
                        this.setState({status: res.status});
                        console.log(this.state.status);
                        if (res.status === "CHOSING_GAME_MODE" || res.status === "CHOSING_GODCARDS") {
                            clearInterval(this.timer);
                            localStorage.setItem("boardID", res.id);
                            this.setState({
                                isShowing: false
                            });
                            this.props.history.push("/gameMode");
                            clearInterval(this.timer);
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
                status: "OFFLINE",

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
        this.timer = null;
        clearInterval(this.timer);
    }

    //
    componentDidMount() {
        fetch(`${getDomain()}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then(async users => {
                await new Promise(resolve => setTimeout(resolve, 800));
                const offlineUsers = users.filter(user => user.status === "OFFLINE");
                const inGameUsers = users.filter(user => user.status === "INGAME");
                const onlineUsers = users.filter(user => user.status === "ONLINE");
                this.setState({users: users, offlineUsers: offlineUsers, inGameUsers: inGameUsers, onlineUsers: onlineUsers});
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
        clearInterval(this.timer);
        if (localStorage.getItem("id") !== null) {
            this.timer = setInterval(() => this.ChallengeStatus(), 5000);
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    acceptWithModal = () => {
        this.accept();
        clearInterval(this.timer);
        this.timer = setInterval(() => this.getGameStatus(), timeInterval);
    };


    //   <button className="open-modal-btn1" onClick={this.openModalHandler}>Open Modal</button>
    render() {
        return (
            <div>{this.state.isShowing ? <div className="back-drop1"></div> : null}


                <Modal
                    className="modal1"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}

                    accept={this.acceptWithModal}>
                    User: {localStorage.getItem("opponentName")} challenged you!
                </Modal>


                <Container>

                    <h2>Santorini players </h2>
                    {!this.state.users ? (
                        <Spinner/>
                    ) : (
                        <div>
                            <Users><p>Online</p>
                                {this.state.onlineUsers.map(user => {

                                        return (
                                            <PlayerContainer key={user.id}>
                                                <div className={"row"}>
                                                    <PlContainer>
                                                        <a className={"link"} href="/playerPage" onClick={() => {
                                                            localStorage.setItem("atID", user.id);
                                                        }}>
                                                            {user.username}
                                                        </a>
                                                        <PlId>
                                                            <Button1 onClick={() => {
                                                                localStorage.setItem("challengeID", user.id);
                                                                this.setState({challengingPUT: user.id});
                                                                this.challengeUser();

                                                            }}
                                                                     disabled={(user.id.toString() === localStorage.getItem("id")) ||
                                                                     localStorage.getItem("challengeID") === user.id.toString()}>Challenge
                                                            </Button1>
                                                        </PlId>
                                                    </PlContainer></div>
                                            </PlayerContainer>
                                        );
                                })}<p>In Game</p>{
                                    this.state.inGameUsers.map(user => {
                                            return (
                                                <PlayerContainer key={user.id}>
                                                    <div className={"row"}>
                                                        <PlContainer>
                                                            <a className={"link"} href="/playerpage" onClick={() => {
                                                                localStorage.setItem("atID", user.id);
                                                            }}>
                                                                {user.username}
                                                            </a>
                                                            <PlId>
                                                                <Button1
                                                                    disabled={true}>Challenge
                                                                </Button1>
                                                            </PlId>
                                                        </PlContainer></div>
                                                </PlayerContainer>
                                            );
                                    })}<p>Offline</p>{
                                    this.state.offlineUsers.map(user => {
                                            return (
                                                <PlayerContainer key={user.id}>
                                                    <div className={"row"}>
                                                        <PlContainer>
                                                            <a className={"link"} href="/playerPage" onClick={() => {
                                                                localStorage.setItem("atID", user.id);
                                                            }}>
                                                                {user.username}
                                                            </a>
                                                            <PlId>
                                                                <Button1
                                                                    disabled={true}>Challenge
                                                                </Button1>
                                                            </PlId>
                                                        </PlContainer></div>
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


                </Container></div>


        );
    }
}

export default withRouter(Game);

