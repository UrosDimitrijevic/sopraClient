import React, {} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import * as ReactDOM from "react-dom";
import {BaseContainer} from "../../helpers/layout";
import Test2 from "./test2";
import './boardindex.css';
import {getDomain} from "../../helpers/getDomain";
import Black1 from "./Black1.1.png"
import Black2 from "./Black2.1.png"
import White1 from "./White1.1.png"
import White2 from "./White2.1.png"
import Default1 from "./Default1.PNG"
import Default2 from "./Default2.PNG"
import Worker1 from "./Worker1.png"
import Worker2 from "./Worker2.png"
import {Spinner} from "../../views/design/Spinner";
import data from "../../GodCards/data";
import Modal from "./WonLostModal";
import Star from "./star.png";


class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClass: false,
            homeLink: [],
            bgColor: "square",
            actionBG: "squareorange"
        }
    }


    redSquare() {
        this.setState({bgColor: "squareRED"})
    }

    defaulactionSquare() {
        this.setState({actionBG: "squareorange"})
    }

    defaultSquare() {
        this.setState({bgColor: "square"})
    }


    onClickFigurine() {

        this.props.clickFigure(this.props.Figure);


    }

    fieldNoAction(level, dome, Figure, squareBG) {
        if (level === 0 && dome === false) {
            return (
                <button className={squareBG}
                        onClick={() => console.log(this.props)}
                >{this.displayFigure(Figure)}
                </button>
            );
        } else if (level === 1) {
            return (
                <button className={squareBG} onClick={() => console.log(this.props)}>{this.level1field(dome, Figure)}
                </button>);
        } else if (level === 2) {
            return (
                <button className={squareBG} onClick={() => console.log(this.props)}>{this.level2field(dome, Figure)}
                </button>);
        } else if (level === 3) {
            return (
                <button className={squareBG} onClick={() => console.log(this.props)}>{this.level3field(dome, Figure)}
                </button>);
        } else {
            return (
                <button className="square"
                        onClick={() => console.log(level, dome)}>
                </button>
            );
        }
    }

    fieldWithAction(level, dome, Figure, squareBG) {
        if (level === 0 && dome === false) {
            return (
                <button className={squareBG}
                        onClick={this.onChangeLink.bind(this)}>{this.displayFigure(Figure)}
                </button>
            );
        } else if (level === 1) {
            return (
                <button className={squareBG} onClick={this.onChangeLink.bind(this)}>{this.level1field(dome, Figure)}
                </button>);
        } else if (level === 2) {
            return (
                <button className={squareBG} onClick={this.onChangeLink.bind(this)}>{this.level2field(dome, Figure)}
                </button>);
        } else if (level === 3) {
            return (
                <button className={squareBG} onClick={this.onChangeLink.bind(this)}>{this.level3field(dome, Figure)}
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
                <img onClick={this.onClickFigurine.bind(this)} style={{cursor: 'pointer'}} alt={"Blacktest1"}
                     className={"center"} src={Black1}/>);
        } else if (Figure === "Black2") {
            return (
                <img onClick={this.onClickFigurine.bind(this)} style={{cursor: 'pointer'}} alt={"Blacktest2"}
                     className={"center"} src={Black2}/>);
        } else if (Figure === "White1") {
            return (
                <img onClick={this.onClickFigurine.bind(this)} style={{cursor: 'pointer'}} alt={"WhiteTest1"}
                     className={"center"} src={White1}/>);
        } else if (Figure === "White2") {
            return (
                <img onClick={this.onClickFigurine.bind(this)} style={{cursor: 'pointer'}} alt={"WhiteTest2"}
                     className={"center"} src={White2}/>);
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


    onChangeLink() {
        let refID = this.props.row * 5 + this.props.column;
        this.redSquare();
        localStorage.setItem("refID", refID);
        localStorage.setItem("actionID", this.props.action.id);
        this.props.changeLink(this.state.homeLink);
        console.log("actionID: " + localStorage.getItem("actionID"));
        console.log("squareID: " + localStorage.getItem("refID"));

    }


    render() {

        if (this.props.action === null) {
            return (this.fieldNoAction(this.props.level, this.props.dome, this.props.Figure, this.state.bgColor)
            );
        } else if (this.props.action !== null) {
            return (this.fieldWithAction(this.props.level, this.props.dome, this.props.Figure, this.state.actionBG)
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
            storeActions: [],
            actionsFigurine1: [],
            actionsFigurine2: [],
            buildingActions: [],
            playWithGodCards: false,
            actionsGod1: [],
            actionsGod2: [],
            actionsGodBuild: [],
        }
    }

    actionsFromSquare = (number) => {
        this.refs[number].defaultSquare();
    };

    containActions() {
        this.setState({actions: this.state.storeActions})
    }

    BuildGod() {
        this.setState({actions: this.state.actionsGodBuild});
    }

    divideActions(actionss, godPower) {
        const actions = acitonss;
        var Figurine1 = [];
        var Figurine2 = [];
        var buildingActions = [];
        var GodFig1 = [];
        var GodFig2 = [];
        var GodBuild = [];
        if (this.props.playWithGodCards === false) {
            if (actions.length > 0) {
                for (let i = 0; i < actions.length; i++) {
                    if (actions[i].figurineNumber === 1) {
                        Figurine1.push(actions[i])
                    } else if (actions[i].figurineNumber === 2) {
                        Figurine2.push(actions[i])
                    } else {
                        buildingActions.push(actions[i])
                    }
                    if(actions[i].name==="PlaceWorker"){
                        buildingActions.push(actions[i])
                    }
                }

            }
        } else {
            if (actions.length > 0) {
                for (let i = 0; i < actions.length; i++) {
                    if (!actions[i].useGod) {
                        if (actions[i].figurineNumber === 1) {
                            Figurine1.push(actions[i])
                        } else if (actions[i].figurineNumber === 2) {
                            Figurine2.push(actions[i])
                        } else {
                            buildingActions.push(actions[i])
                        }if(actions[i].name==="PlaceWorker"){
                            buildingActions.push(actions[i])
                        }
                    } else if (actions[i].useGod === true) {
                        if (actions[i].figurineNumber === 1) {
                            GodFig1.push(actions[i])
                        } else if (actions[i].figurineNumber === 2) {
                            GodFig2.push(actions[i])
                        } else {
                            if(actions[i].name === "BuildingAsDemeter"){
                                buildingActions.push(actions[i]);
                            } else {
                                GodBuild.push(actions[i]);
                            }
                        }

                    } else if (actions[i].name === "Building") {
                        buildingActions.push(actions[i]);
                    } else if (actions[i].name === "PlaceWorker") {
                        buildingActions.push(actions[i]);
                    }
                }

            }
        }
        if (this.props.useGodPower && GodBuild.length > 0) {
            this.setState({
                actionsFigurine1: Figurine1,
                actionsFigurine2: Figurine2,
                buildingActions: buildingActions,
                actions: GodBuild,
                actionsGod1: GodFig1,
                actionsGod2: GodFig2,
                actionsGodBuild: GodBuild,
            })
        } else {
            this.setState({
                actionsFigurine1: Figurine1,
                actionsFigurine2: Figurine2,
                buildingActions: buildingActions,
                actions: buildingActions,
                actionsGod1: GodFig1,
                actionsGod2: GodFig2,
                actionsGodBuild: GodBuild
            })
        }

    }

    Figurine1() {
        if (this.props.useGodPower === false) {
            this.setState({actions: this.state.actionsFigurine1})
        } else if (this.props.useGodPower === true) {
            this.setState({actions: this.state.actionsGod1})
        }
    }

    Figurine2() {
        if (this.props.useGodPower === false) {
            this.setState({actions: this.state.actionsFigurine2})
        } else if (this.props.useGodPower === true) {
            this.setState({actions: this.state.actionsGod2})
        }
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
                    console.log(res);
                    clearInterval(this.timer);
                } else {
                    return res.json();
                }
            })
            .then(res => {
                switch (resStatus) {
                    case 200:
                        if (res.length < 1) {
                            break;
                        } else if (this.state.storeActions.length < 1) {
                            this.setState({
                                storeActions: res
                            }, () => {
                                this.divideActions(this.state.storeActions);
                            });
                            break;
                        } else if (this.state.storeActions[0].id !== res[0].id) {
                            this.setState({
                                storeActions: res
                            }, () => {
                                this.divideActions(this.state.storeActions);
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
                alert("Something went wrong catching actions: " + err);
                clearInterval(this.timer2);
            });
    }

    componentWillUnmount() {
        clearInterval(this.timer2);
    }

    endGameID() {
        console.log(this.state.storeActions);
        localStorage.setItem("actionID", this.state.storeActions[0].id);
        console.log(localStorage.getItem("actionID"));
    }

    clickme3(useGodBuild) {
        this.timer2 = setInterval(() => this.getActions(), 1000);
        this.divideActions(this.state.storeActions);
        if (useGodBuild) {
            this.setState({
                actions: this.state.actionsGodBuild
            })
        } else {
            this.setState({
                actions: this.state.buildingActions
            })
        }
    }


    confirm() {
        var number = localStorage.getItem("refID");

        this.putAction();
        console.log(localStorage.getItem("clicked"));
        localStorage.removeItem("clicked");
        localStorage.removeItem("actionID");
        console.log(this.state.homeLink);

        this.actionsFromSquare("SquareID" + number);
        this.setState({clicked: false, actions: [], actionsFigurine1: null, actionsFigurine2: null, storeActions: [], actionsGod1: null, actionsGod2: null, actionsGodBuild: []})

    }

    cancel() {
        var number = localStorage.getItem("refID");
        localStorage.removeItem("clicked");
        this.actionsFromSquare("SquareID" + number);
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
            table.push(<div key ={i} className="board-row">{BoardRow}</div>)
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

    clickFigure(Figure) {
        if (this.props.Player1.myUserID.toString() === localStorage.getItem("id")) {
            if (Figure === "White1") {
                if (this.props.useGodPower === false) {
                    this.setState({actions: this.state.actionsFigurine1})
                } else if (this.props.useGodPower === true) {
                    this.setState({actions: this.state.actionsGod1})
                }
            } else if (Figure === "White2") {
                if (this.props.useGodPower === false) {
                    this.setState({actions: this.state.actionsFigurine2})
                } else if (this.props.useGodPower === true) {
                    this.setState({actions: this.state.actionsGod2})
                }
            }
        }
        else{
            if (Figure === "Black1") {
                if (this.props.useGodPower === false) {
                    this.setState({actions: this.state.actionsFigurine1})
                } else if (this.props.useGodPower === true) {
                    this.setState({actions: this.state.actionsGod1})
                }
            } else if (Figure === "Black2") {
                if (this.props.useGodPower === false) {
                    this.setState({actions: this.state.actionsFigurine2})
                } else if (this.props.useGodPower === true) {
                    this.setState({actions: this.state.actionsGod2})
                }
            }
        }
    }

    renderSquare(row, column, level, dome, actions, figurine, count) {
        return <Square
            key={this.calculateKey(row, column)}
            action={this.checkAction(actions, row, column)}
            row={row} column={column}
            level={level}
            figurine={figurine}
            dome={dome}
            changeLink={this.onChangeLinkName.bind(this)}
            clicked={this.state.clicked}
            Figure={this.checkFigurine(this.props.Player1, this.props.Player2, row, column)}
            count={count}
            ref={this.calculateRef(row, column)}
            useGodPower={this.props.useGodPower}
            clickFigure={this.clickFigure.bind(this)}
            isStartingPlayer={this.isStartingPlayer()}
        />;
    }

    isStartingPlayer() {
        return this.props.Player1.myUserID.toString() === localStorage.getItem("id");
    }
    calculateKey(row, column){
        return (row * 5 + column)
    }
    calculateRef(row, column) {
        return "SquareID" + (row * 5 + column).toString();
    }

    waiting() {
        if (!this.checkcurrentplayer()) {
            return <div className={"status"}><Spinner/>
                <div className={"status"}>Waiting</div>
            </div>
        } else {
            return (<div className={"status"}>Your Turn!</div>)
        }
    }

    checkcurrentplayer() {
        return this.props.currentPlayer.toString() === localStorage.getItem("id");
    }

    //  <button onClick={() => this.clickme3()}>Actions</button>
    render() {
        const status = this.props.status;
        return (
            <div className={"board"}>
                <div className="status">{status}</div>
                {this.createTable(this.props.board, this.state.actions)}
                <button  style={{opacity: "0"}} className={"myButton"} disabled={!this.checkcurrentplayer() || this.state.clicked}
                        onClick={() => {
                            this.Figurine1();
                            console.log(this.state.actionsFigurine1)
                        }}>Figurine1
                </button>
                <button  style={{opacity: "0"}} className={"myButton"} disabled={!this.checkcurrentplayer() || this.state.clicked}
                        onClick={() => {
                            this.Figurine2();
                            console.log(this.state.actionsFigurine1)
                        }}>Figurine2
                </button>
                <button className={"myButton"} onClick={() => this.confirm()}
                        disabled={!this.state.clicked}>Confirm
                </button>
                <button className={"myButton"} onClick={() => this.cancel()}
                        disabled={!this.state.clicked}>Cancel
                </button>

                {this.waiting()}
            </div>
        );
    }

    putAction() {
        fetch(`${getDomain()}/game/`+localStorage.getItem("boardID")+`/actions/` , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: parseInt(localStorage.getItem("actionID"))

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
                    alert(`Something went wrong during playing: ${err.message}`);
                }
            });
    }


}

class GameBoard extends React.Component {
    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    };

    showMenu(event) {
        event.preventDefault();

        this.setState({showMenu: true}, () => {
            document.addEventListener('click', this.closeMenu);
        });
        //this.actionsFromBoard();
    }

    closeMenu(event) {
        // !
        if (this.dropdownMenu.contains(event.target)) {

            this.setState({showMenu: false}, () => {
                document.removeEventListener('click', this.closeMenu);
            });

        }
    }

    endGameFromBoard = () => {
        this.refs.board.endGameID();
        this.refs.board.putAction();
        localStorage.removeItem("god2");
        localStorage.removeItem("gettingChallengedByID");
        localStorage.removeItem("god1");
        localStorage.removeItem("challengeID");
        localStorage.removeItem("boardID");
        localStorage.removeItem("opponentName");
        localStorage.removeItem("actionID");
        localStorage.removeItem("refID");
        this.props.history.push("/game");
    };
    actionsFromBoardDefault = () => {
        this.setState({useGodPower: false});
        this.refs.board.clickme3(false);
    };
    actionsFromBoardGod = () => {
        this.setState({useGodPower: true});
        this.refs.board.clickme3(true);
    };
    showStar(Godpower){
        if(Godpower){
            return (<img className={"star"}  height={20} alt={"star"}
                         width={20} src={Star}/>);
        }else return null;
    };

    showActionsButton(Player) {
        if (this.state.playWithGodCards) {
            if (Player.myUserID.toString() === localStorage.getItem("id")) {
                return (<div>
                    <button className={"myButton"}
                            disabled={!(this.state.currentPlayer.toString() === localStorage.getItem("id"))}
                            onClick={this.showMenu}>
                        Action Options
                    </button>{this.showStar(this.state.useGodPower)}
                    {
                        this.state.showMenu
                            ? (
                                <div
                                    className="menu"
                                    ref={(element) => {
                                        this.dropdownMenu = element;
                                    }}
                                >
                                    <button className={"myButton"} onClick={this.actionsFromBoardDefault}> Default Actions
                                    </button>
                                    <br/>
                                    <button className={"myButton"} onClick={this.actionsFromBoardGod}> GodPower Actions
                                    </button>

                                </div>
                            )
                            : (
                                null
                            )
                    }
                </div>)
            }
        } else {
            if (Player.myUserID.toString() === localStorage.getItem("id")) {
                return (<div>
                    <button className={"myButton"}
                            disabled={localStorage.getItem("id") !== this.state.currentPlayer.toString()}
                            onClick={this.actionsFromBoardDefault}> DefaultActions
                    </button>
                </div>)
            }
        }
    }

    displayName(Player) {
        if (localStorage.getItem("id") === Player.toString()) {
            return localStorage.getItem("username");
        } else {
            return localStorage.getItem("opponentName")
        }
    }

    // invisible buttons if presentation bugs
    render() {
        return (
            <BaseContainer>
                <button
                    style={{opacity: "0"}}
                    onClick={() => this.clickme2()}
                >getGameStatus
                </button>
                <div className="row">
                    <div className={"column"}> {this.displayName(this.state.startingPlayer.myUserID)}
                        {this.GodPicture(this.state.startingPlayer)}
                        {this.showActionsButton(this.state.startingPlayer)}
                    </div>
                    <div className="columnboard">
                        <Board key={this.state.id}
                               status={this.state.status}
                               board={this.state.board}
                               Player1={this.state.startingPlayer}
                               Player2={this.state.nonStartingPlayer}
                               currentPlayer={this.state.currentPlayer}
                               playWithGodCards={this.state.playWithGodCards}
                               useGodPower={this.state.useGodPower}
                               ref="board"
                        />
                    </div>
                    <div className="column">
                        {this.displayName(this.state.nonStartingPlayer.myUserID)}
                        {this.GodPicture(this.state.nonStartingPlayer)}
                        {this.showActionsButton(this.state.nonStartingPlayer)}
                    </div>
                </div>
                {this.renderModal()}

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
                        if (res.status === "STARTINGPLAYER_WON") {
                            this.setState({
                                isShowing: true
                            });
                            this.refs.board.getActions();
                            if (res.nonStartingPlayer.myUserID.toString() === localStorage.getItem("id")) {
                                this.setState({result: "lost"});

                            }
                        } else if (res.status === "NONSTARTINGPLAYER_WON") {
                            this.setState({
                                isShowing: true
                            });
                            this.refs.board.getActions();
                            if (res.startingPlayer.myUserID.toString() === localStorage.getItem("id")) {
                                this.setState({result: "lost"})
                            }

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
                alert("Something went wrong catching game Status: " + err);
                clearInterval(this.timer);
            });
    }

    surrender = () => {
        var surrenderID = localStorage.getItem("id");
        localStorage.setItem("actionID", surrenderID);

        this.refs.board.putAction();

        localStorage.removeItem("actionID");
        localStorage.removeItem("refID");
        //this.props.history.push("/game");
    };

    componentDidMount() {
        clearInterval(this.timer);
        this.getGameStatus();
        this.timer = setInterval(() => this.getGameStatus(), 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    clickMe() {
        this.setState({
            id: Test2.id,
            player1id: Test2.player1id,
            player2id: Test2.player1id,
            status: Test2.status,
            playWithGodCards: Test2.playWithGodCards,
            board: Test2.board,
            nonStartingPlayer: Test2.nonStartingPlayer,
            currentPlayer: Test2.currentPlayer,
            startingPlayer: Test2.startingPlayer,
        });
        console.log(this.state.showGodCard);
        clearInterval(this.timer)
    }

    clickme2() {
        clearInterval(this.timer);
        this.getGameStatus();
        this.timer = setInterval(() => this.getGameStatus(), 1000);
    }

    GodPicture(Player) {
        if (Player.assignedGod) {
            return (this.GodDescription(Player)

            )
        } else if (Player === this.state.startingPlayer) {
            return (<div className={"defaultPicture"}><img alt={"NoGod" + localStorage.getItem("id")} height={330}
                                                           width={200} src={Default1}/></div>)
        } else {
            return (<div className={"defaultPicture"}><img alt={"NoGod" + localStorage.getItem("id")} height={330}
                                                           width={200} src={Default2}/></div>)
        }
    }

    GodDescription(Player) {
        if (this.state.showGodCard) {
            return (<div onClick={() => this.setState({showGodCard: !this.state.showGodCard})}><img
                alt={Player.assignedGod.name} height={350} width={200}
                src={data.properties[Player.assignedGod.godnumber - 1].picture}/></div>)
        } else {
            return (<button onClick={() => this.setState({showGodCard: !this.state.showGodCard})} className={"GodText"}>
                <b>{data.properties[Player.assignedGod.godnumber - 1].title}</b>
                <p>{data.properties[Player.assignedGod.godnumber - 1].text}</p></button>)
        }
    }

    openModalHandler = () => {
        this.setState({
            isShowing: true
        });
    };

    testDashboard() {
        localStorage.removeItem("god2");
        localStorage.removeItem("gettingChallengedByID");
        localStorage.removeItem("god1");
        localStorage.removeItem("challengeID");
        this.props.history.push("/game");
    }

    goBackToDashboard = () => {
        localStorage.removeItem("boardID");
        console.log("redirect");
        this.testDashboard();
    };
    message(){
        if(this.state.restult === "won"){
            return "Woweee you won"
        }else{
            return "ooh no, "+ localStorage.getItem("opponentNmae")+ " decimated you!"
        }
    }

    renderModal() {
        return (
            <div>{this.state.isShowing ? <div className="back-drop2"></div> : null}


                <Modal
                    className="modal2"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}
                    status={this.state.status}
                    message={this.message}
                    accept={this.goBackToDashboard}
                    endGame={this.endGameFromBoard}
                    result={this.state.result}
                >
                    GameStatus:
                </Modal>
                <button style={{opacity: "1"}} className="myButton" onClick={this.surrender}>Surrender Modal
                </button>
            </div>)
    }
    // invisible buttons if presentation bugs
    constructor() {
        super();
        this.state = {
            result: "won",
            isStartingPlayer: false,
            useGodPower: false,
            isShowing: false,
            "showGodCard": true,
            "showGodCard2": true,
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

/*ReactDOM.render(
    <Game/>,
    document.getElementById('root')
); */

export default withRouter(GameBoard)

