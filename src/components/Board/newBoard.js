import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import * as ReactDOM from "react-dom";
import {BaseContainer} from "../../helpers/layout";
import Test1 from "./initGameStatus";
import Test2 from "./test2";
import actionstest1 from "./actionstest1";
import './boardindex.css';
import {getDomain} from "../../helpers/getDomain";
import White from "./WhiteFigure.png"
import Black from "./BlackFigure.png"
import Black1 from "./Black1.1.png"
import Black2 from "./Black2.1.png"
import White1 from "./White1.1.png"
import White2 from "./White2.1.png"
import Default1 from "./Default1.PNG"
import Default2 from "./Default2.PNG"
import Worker1 from "./Worker1.png"
import Worker2 from "./Worker2.png"
import {ErrorCode} from "../shared/ErrorHandler/ErrorHandler";
import Apollo from "../../GodCards/Apollo.PNG"
import {Spinner} from "../../views/design/Spinner";
import data from "../../GodCards/data";


class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClass: false,
            homeLink: [],
            bgColor: "green"
        }
    }

    fieldNoAction(level, dome, Figure) {
        if (level === 0 && dome === false) {
            return (
                <button className="square"
                        onClick={() => {
                            console.log(this.props)
                        }}>{this.displayFigure(Figure)}
                </button>
            );
        } else if (level === 1) {
            return (
                <button className="square" onClick={() => console.log(this.props)}>{this.level1field(dome, Figure)}
                </button>);
        } else if (level === 2) {
            return (
                <button className="square" onClick={() => console.log(this.props)}>{this.level2field(dome, Figure)}
                </button>);
        } else if (level === 3) {
            return (
                <button className="square" onClick={() => console.log(this.props)}>{this.level3field(dome, Figure)}
                </button>);
        } else {
            return (
                <button className="square"
                        onClick={() => console.log(level, dome)}>
                </button>
            );
        }
    }

    fieldWithAction(level, dome) {
        if (level === 0 && dome === false) {
            return (
                <button className="squareorange"
                        onClick={this.onChangeLink.bind(this)}>
                </button>
            );
        } else if (level === 1) {
            return (
                <button className="squareorange" onClick={this.onChangeLink.bind(this)}>{this.level1field(dome)}
                </button>);
        } else if (level === 2) {
            return (
                <button className="squareorange" onClick={this.onChangeLink.bind(this)}>{this.level2field(dome)}
                </button>);
        } else if (level === 3) {
            return (
                <button className="squareorange" onClick={this.onChangeLink.bind(this)}>{this.level3field(dome)}
                </button>);
        } else {
            return (
                <button className="squareorange"
                        onClick={() => console.log(this.props)}>
                </button>
            );
        }
    }

    displayFigure(Figure) {
        if (Figure === "Black1") {
            return (
                <img alt={"Blacktest1"} className={"center"} src={Black1}/>);
        } else if (Figure === "Black2") {
            return (
                <img alt={"Blacktest2"} className={"center"} src={Black2}/>);
        } else if (Figure === "White1") {
            return (
                <img alt={"WhiteTest1"} className={"center"} src={White1}/>);
        } else if (Figure === "White2") {
            return (
                <img alt={"WhiteTest2"} className={"center"} src={White2}/>);
        } else {
            return null;
        }
    }

    level1field(dome, Figure) {
        if (dome === false) {
            return (
                <div className="squareLevel1">{this.displayFigure(Figure)}
                </div>
            );
        } else if (dome === true) {
            return (<div className="squareLevel1">{this.domeBuild()}
            </div>)
        }

    }

    level2field(dome, Figure) {
        if (dome === false) {
            return (
                <div className="squareLevel1">
                    <div className="squareLevel2">{this.displayFigure(Figure)}
                    </div>
                </div>
            );
        } else if (dome === true) {
            return (<div className="squareLevel1">
                <div className="squareLevel2">{this.domeBuild()}
                </div>
            </div>);
        }
    }

    level3field(dome, Figure) {
        if (dome === false) {
            return (
                <div className="squareLevel1">
                    <div className="squareLevel2">
                        <div className="squareLevel3">{this.displayFigure(Figure)}
                        </div>
                    </div>
                </div>
            );
        } else if (dome === true) {
            return (<div className="squareLevel1">
                <div className="squareLevel2">
                    <div className="squareLevel3">{this.domeBuild()}
                    </div>
                </div>
            </div>);
        }
    }

    domeBuild(dome) {
        return (
            <div className="dome">
            </div>
        );
    }

    confirmsquareaction() {
        this.props.confirm();
    }

    onChangeLink() {
        localStorage.setItem("actionID", this.props.action.id);
        this.props.changeLink(this.state.homeLink);
        console.log(localStorage.getItem("actionID"));

    }

    toggle() {
        this.setState({clickedsquare: !this.state.clickedsquare});
        localStorage.setItem("clicked", this.props.row);
        console.log(this.state.clickedsquare);

    }

    clickAction() {
        localStorage.setItem("actionID", this.props.action);
        console.log(localStorage.getItem("actionID"))
    }


    /*<div className="square3">
    <img alt={"qwerwe"} width={50} height={50} src = {Black}/></div>
     let boxClass = ["square"];
        if (this.state.clickedsquare) {
            boxClass.push('green');
        }
        if (this.props.column === 2 && this.props.row === 0) {
            return (
                <button className={boxClass.join(' ')} onClick={this.toggle.bind(this)}>gh</button>)
        }

        else if (this.props.action.name === "PlaceWorker") {
            return (
                <button className="squareorange"
                        onClick={() => {
                            localStorage.setItem("actionID", this.props.action.id);
                            console.log(localStorage.getItem("actionID"));

                        }}

                >
                </button>
            );
        }

    */


    render() {

        if (this.props.action === null) {
            return (this.fieldNoAction(this.props.level, this.props.dome, this.props.Figure)
            );
        } else if (this.props.action !== null) {
            return (this.fieldWithAction(this.props.level, this.props.dome)
            );
        } else {
            return (
                <button className="square2"
                        onClick={this.onChangeLink.bind(this)}
                >
                    <div className="squareLevel1"> {this.props.level}</div>
                </button>
            );
        }
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [],
            homeLink: "home",
            clicked: false,
            getActions: null,
            actionsFigurine1: [],
            actionsFigurine2: [],
        }
    }

    containActions() {
        this.setState({actions: this.state.getActions})
    }

    divideActions(actions) {
        var Figurine1 = [];
        var Figurine2 = [];
        var buildingActions = [];
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                if (actions[i].figurineNumber === 1) {
                    Figurine1.push(actions[i])
                } else if (actions[i].figurineNumber === 2) {
                    Figurine2.push(actions[i])
                } else {
                    buildingActions.push(actions[i])
                }
            }

        }
        this.setState({actionsFigurine1: Figurine1, actionsFigurine2: Figurine2, actions: buildingActions})
    }

    Figurine1() {
        this.setState({actions: this.state.actionsFigurine1})
    }

    Figurine2() {
        this.setState({actions: this.state.actionsFigurine2})
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
                        this.setState({
                            getActions: res
                        });
                        console.log("zwölf");
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
                clearInterval(this.timer2);
            });
    }
    componentWillUnmount() {
        clearInterval(this.timer2);
    }


    clickme3() {
        this.getActions();
        this.timer2 = setInterval(() => this.getActions(), 10000);
        this.divideActions(this.state.getActions);

    }


    confirm() {
        this.putAction();
        console.log(localStorage.getItem("clicked"));
        localStorage.removeItem("clicked");
        localStorage.removeItem("actionID");
        console.log(this.state.homeLink);
        this.setState({clicked: false, actions: [], actionsFigurine1: null, actionsFigurine2: null})

    }

    cancel() {
        localStorage.removeItem("clicked");
        this.setState({clicked: false, actions: this.state.getActions});

    }


    createTable = (board, actions, figurine) => {
        let table = [];
        let count = 0;
        figurine = 1;
        for (let i = 0; i < 5; i++) {
            let BoardRow = [];
            for (let j = 0; j < 5; j++) {
                BoardRow.push(this.renderSquare(i, j, board.spaces[i][j].level, board.spaces[i][j].dome, actions, figurine, count));
                count++;
            }
            table.push(<div className="board-row">{BoardRow}</div>)
        }
        return table
    };
    //checks if action is in this button
    checkAction(actions, row, column) {
        let buttonAciton = null;
        if (actions) {
            for (let i = 0; i < actions.length; i++) {
                if (actions[i].row === row && actions[i].column === column) {
                    buttonAciton = actions[i];
                }
            }
            return buttonAciton;
        } else {
            return null;
        }
    }

    // checks if button has figurine
    checkFigurine(Player1, Player2, row, column) {
        if (Player1.figurine1.position !== null) {
            if (Player1.figurine1.position[0] === row && Player1.figurine1.position[1] === column) {
                return "White1";
            }
        }
        if (Player1.figurine2.position !== null) {
            if (Player1.figurine2.position[0] === row && Player1.figurine2.position[1] === column) {
                return "White2";
            }
        }
        if (Player2.figurine1.position !== null) {
            if (Player2.figurine1.position[0] === row && Player2.figurine1.position[1] === column) {
                return "Black1";
            }
        }
        if (Player2.figurine2.position !== null) {
            if (Player2.figurine2.position[0] === row && Player2.figurine2.position[1] === column) {
                return "Black2";
            }
        } else {
            return "No Figure";
        }
    }

    onChangeLinkName(newName) {
        this.setState({
            actions: newName,
            clicked: true,
        });
    }

    renderSquare(row, column, level, dome, actions, figurine, count) {
        return <Square
            action={this.checkAction(actions, row, column)}
            row={row} column={column}
            level={level}
            figurine={figurine}
            dome={dome}
            changeLink={this.onChangeLinkName.bind(this)}
            clicked={this.state.clicked}
            Figure={this.checkFigurine(this.props.Player1, this.props.Player2, row, column)}
            count={count}
        />;
    }

    waiting() {
        if (!this.checkcurrentplayer()) {
            return <div className={"status"}><Spinner/>
                <div className={"status"}>Waiting</div>
            </div>
        }
        else{
            return(<div className={"status"}>Your Turn!</div>)
        }
    }

    checkcurrentplayer() {
        return this.props.currentPlayer.toString() === localStorage.getItem("id");
    }

    render() {
        const status = this.props.status;
        return (
            <div className={"board"}>
                <div className="status">{status}</div>
                {this.createTable(this.props.board, this.state.actions)}
                <button onClick={() => this.clickme3()}>Actions</button>
                <button onClick={() => this.confirm()}
                        disabled={!this.state.clicked}>Confirm
                </button>
                <button onClick={() => this.cancel()}
                        disabled={!this.state.clicked}>Cancel
                </button>
                <button onClick={() => {
                    this.Figurine1();
                    console.log(this.state.actionsFigurine1)
                }}>Figurine1
                </button>
                <button onClick={() => {
                    this.Figurine2();
                    console.log(this.state.actionsFigurine1)
                }}>Figurine2
                </button>
                {this.waiting()}
            </div>
        );
    }

    putAction() {
        fetch(`${getDomain()}/game/actions/` + localStorage.getItem("actionID"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

        }).then(response => {
            console.log(response);

        })
            .catch(err => {
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else if (err.message.match(/unauthorized/)) {     //wrong password, do as soon as you know how to
                    alert('wrong username or password');
                    this.props.history.push('/login');
                } else if (err.message.match(/not_found/)) {
                    alert("username already taken or id not-found");
                } else {
                    alert(`Something went wrong during the login: ${err.message}`);
                }
            });
    }

    /*  <button onClick={() => this.divideActions(this.state.actions)}>DivideActions</button>
              <button onClick={() => this.containAcitons()}>ContainActions</button>*/


}

class Game extends React.Component {

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu(event) {

        if (!this.dropdownMenu.contains(event.target)) {

            this.setState({showMenu: false}, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    showActionsButton(Player) {
        if (Player.myUserID.toString() === localStorage.getItem("id")) {
            return (<div>
                <button onClick={this.showMenu}>
                    Actions
                </button>

                {
                    this.state.showMenu
                        ? (
                            <div
                                className="menu"
                                ref={(element) => {
                                    this.dropdownMenu = element;
                                }}
                            >
                                <button> Default Actions</button>
                                <br/>
                                <button> God Actions</button>

                            </div>
                        )
                        : (
                            null
                        )
                }
            </div>)
        }
    }

//<img src={Apollo} alt = "Player1Pic" width = {100} height={175}/>
    render() {
        return (
            <BaseContainer>
                <button
                    onClick={() => this.clickMe()}
                >CustomGameStatus
                </button>
                <button
                    onClick={() => this.clickme2()}
                >getGameStatus
                </button>
                <div className="row">
                    <div className={"column"}> StartingPlayer
                        {this.GodPicture(this.state.startingPlayer)}
                        {this.showActionsButton(this.state.startingPlayer)}</div>
                    <div className="columnboard">
                        <Board status={this.state.status}
                               board={this.state.board}
                               Player1={this.state.startingPlayer}
                               Player2={this.state.nonStartingPlayer}
                               currentPlayer={this.state.currentPlayer}/>
                    </div>
                    <div className="column">
                        NonStartingPlayer
                        {this.GodPicture(this.state.nonStartingPlayer)}
                        {this.showActionsButton(this.state.nonStartingPlayer)}
                    </div>
                </div>

            </BaseContainer>
        );
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
                    console.log(res)
                } else {
                    return res.json();
                }
            })
            .then(res => {
                switch (resStatus) {
                    case 200:
                        this.setState({
                                id: res.id,
                                player1id: res.player1id,
                                player2id: res.player1id,
                                status: res.status,
                                playWithGodCards: res.playWithGodCards,
                                board: res.board,
                                nonStartingPlayer: res.nonStartingPlayer,
                                currentPlayer: res.currentPlayer,
                                startingPlayer: res.startingPlayer,
                            }
                        );
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

    componentDidMount() {
        // this.getGameStatus();

    }

    clickMe() {
        console.log(this.state.status);
        console.log(this.state.board.spaces[0][0].level);
        console.log(this.state.board.spaces[0][1].level);
        this.setState(Test2);
        this.setState({swag: "asdf"});
        console.log(this.state.swag);
        console.log(this.state.board.spaces[0][1].level);
        clearInterval(this.timer)
    }

    clickme2() {
        this.getGameStatus();
        this.timer = setInterval(() => this.getGameStatus(), 10000);
    }
    GodPicture(Player){
        if (Player.assignedGod){
            return(<img alt={Player.assignedGod.name} height={350} width={200} src={data.properties[Player.assignedGod.godnumber-1].picture}/>

            )
        }
        else if (Player === this.state.startingPlayer){
            return(<img alt={"NoGod"+localStorage.getItem("id")} height={330} width={200} src={Default1}/>)
        }
        else{
            return(<img alt={"NoGod"+localStorage.getItem("id")} height={350} width={200} src={Default2}/>)
        }
    }

    constructor() {
        super();
        this.state = {
            "id": 3,
            "player1id": 1,
            "player2id": 2,
            "status": "MOVING_STARTINGPLAYER",
            "playWithGodCards": false,
            "board": {
                "spaces": [
                    [
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        }
                    ],
                    [
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        }
                    ],
                    [
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        }
                    ],
                    [
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        }
                    ],
                    [
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 0,
                            "dome": false
                        }
                    ]
                ]
            },
            "nonStartingPlayer": {
                "myUserID": 2,
                "startingplayer": false,
                "playerNumber": 2,
                "assignedGod": null,
                "figurine1": {
                    "figurineNumber": 1,
                    "position": [
                        null,
                        null
                    ]
                },
                "figurine2": {
                    "figurineNumber": 2,
                    "position": [
                        null,
                        null
                    ]
                }
            },
            "currentPlayer": 1,
            "startingPlayer": {
                "myUserID": 1,
                "startingplayer": true,
                "playerNumber": 1,
                "assignedGod": null,
                "figurine1": {
                    "figurineNumber": 1,
                    "position": [
                        null,
                        null
                    ]
                },
                "figurine2": {
                    "figurineNumber": 2,
                    "position": [
                        null,
                        null
                    ]
                }
            },
            "showMenu1": false

        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

export default withRouter(Game)

/*
<button
className={"square2"}> Worker 1 <img alt={"qwerwe"} width={50} height={30} src={Black}
onClick={() => {
    this.setState({chosenfigurine: 1});
    console.log(this.state.chosenfigurine)
}}
/>
</button>
<button className={"square2"}> Worker 2 <img alt={"qwerwe"} width={50} height={30} src={Black}
onClick={() => {
    this.setState({chosenfigurine: 2});
    console.log(this.state.chosenfigurine)
}}
/></button>
<button className={"square2"}> Worker 1 <img alt={"qwerwe"} width={50} height={30} src={White}/>
</button>
<button className={"square2"}> Worker 2 <img alt={"qwerwe"} width={50} height={30} src={White}/>
</button>*/