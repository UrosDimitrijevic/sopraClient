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


class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addClass: false,
            homeLink: [],
            bgColor: "green"
        }
    }

    fieldNoAction(level, dome) {
        if (level === 0 && dome === false){return (
            <button className="square"
                    onClick={()=>{console.log(this.props)}}>
            </button>
        );}
        else if(level === 1){return(
            <button className="square" onClick={()=>console.log(this.props)}>{this.level1field(dome)}
            </button>);
        }
        else if(level === 2){return(
            <button className="square" onClick={()=>console.log(this.props)}>{this.level2field(dome)}
            </button>);
        }
        else if(level === 3){return(
            <button className="square" onClick={()=>console.log(this.props)}>{this.level3field(dome)}
            </button>);
        }

        else {return (
            <button className="square"
            onClick={()=>console.log(level, dome)}>
            </button>
        );}
    }
    fieldWithAction(level, dome)  {
        if (level === 0 && dome === false){return (
            <button className="squareorange"
                    onClick={()=>{console.log(this.props)}}>
            </button>
        );}
        else if(level === 1){return(
            <button className="squareorange" onClick={()=>console.log(this.props)}>{this.level1field(dome)}
            </button>);
        }
        else if(level === 2){return(
            <button className="squareorange" onClick={()=>console.log(this.props)}>{this.level2field(dome)}
            </button>);
        }
        else if(level === 3){return(
            <button className="squareorange" onClick={this.onChangeLink.bind(this)}>{this.level3field(dome)}
            </button>);
        }

        else {return (
            <button className="squareorange"
                    onClick={()=>console.log(level, dome)}>
            </button>
        );}
    }


    level1field(dome) {
        if(dome === false){
        return (
            <div className="squareLevel1">
            </div>
        );}
        else if(dome === true){return (<div className="squareLevel1">{this.domeBuild()}
        </div>)

        }
    }
    level2field(dome){
        if(dome === false){
            return (
                <div className="squareLevel1">
                    <div className="squareLevel2">
                    </div>
                </div>
            );}
        else if(dome === true){return (<div className="squareLevel1"> <div className="squareLevel2">{this.domeBuild()}
        </div>
        </div>);
        }
    }
    level3field(dome){
        if(dome === false){
            return (
                <div className="squareLevel1">
                    <div className="squareLevel2"><div className="squareLevel3">
                    </div>
                    </div>
                </div>
            );}
        else if(dome === true){return (<div className="squareLevel1"> <div className="squareLevel2"><div className="squareLevel3">{this.domeBuild()}
        </div>
        </div>
        </div>);
        }
    }
    domeBuild(dome){
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
        console.log("wqerweq");

    }

    toggle() {
        this.setState({clickedsquare: !this.state.clickedsquare});
        localStorage.setItem("clicked", this.props.row);
        console.log(this.state.clickedsquare);

    }
    clickAction(){
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

    */


    render() {

        if (this.props.action === null) {
            return (this.fieldNoAction(this.props.level, this.props.dome)
            );
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
        else if (this.props.action !== null) {
                return (this.fieldWithAction(this.props.level, this.props.dome)
                );
            }
        else {
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
            actions: actionstest1,
            homeLink: "home",
            clicked: false,
        }
    }

    getActions() {
        let resStatus = 0;
        fetch(`${getDomain()}/game/actions/1`, {
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
                            actions: res
                        });
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

    clickme3() {
        this.getActions();
    }

    clickme4() {
        this.setState({actions: actionstest1})
    }

    clickme5() {
        this.setState({actions: null})
    }

    confirm() {
        console.log(localStorage.getItem("clicked"));
        localStorage.removeItem("clicked");
        console.log(this.state.homeLink);
        this.setState({clicked: false})

    }

    cancel() {
        localStorage.removeItem("clicked");
        this.setState({clicked: false, actions: actionstest1});

    }


    createTable = (board, actions, figurine) => {
        let table = [];
        figurine = 1;
        for (let i = 0; i < 5; i++) {
            let BoardRow = [];
            for (let j = 0; j < 5; j++) {
                BoardRow.push(this.renderSquare(i, j, board.spaces[i][j].level, board.spaces[i][j].dome, actions, figurine));
            }
            table.push(<div className="board-row">{BoardRow}</div>)
        }
        return table
    };

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

    onChangeLinkName(newName) {
        this.setState({
            actions: newName,
            clicked: true,
        });
    }

    renderSquare(row, column, level, dome, actions, figurine) {
        return <Square
            action={this.checkAction(actions, row, column)}
            row={row} column={column}
            level={level}
            figurine={figurine}
            dome={dome}
            changeLink={this.onChangeLinkName.bind(this)}
            clicked={this.state.clicked}
        />;
    }

    render() {
        const status = this.props.status;
        return (
            <div>
                <div className="status">{status}</div>
                {this.createTable(this.props.board, this.state.actions)}
                <button onClick={() => this.clickme3()}>Actions</button>
                <button onClick={() => this.clickme4()}>ActionsCustom</button>
                <button onClick={() => this.clickme5()}>ActionsNone</button>
                <button onClick={() => this.confirm()}
                disabled={!this.state.clicked}>Confirm</button>
                <button onClick={() => this.cancel()}
                disabled={!this.state.clicked}>Cancel</button>
                <div>{this.state.homeLink}</div>
            </div>
        );
    }


}

class Game extends React.Component {
    constructor() {
        super();
        this.state =
            Test1
    }

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
                <div className="game">
                    <div className="game-board">
                        <Board status={this.state.status} board={this.state.board}
                               chosenfigurine={this.state.chosenfigurine}/>
                    </div>
                    <div className="game-info">
                        <div>{}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
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
                </button>
            </BaseContainer>
        );
    }

    getGameStatus() {
        let resStatus = 0;
        fetch(`${getDomain()}/game/Board/1`, {
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
                            status: res.status,
                            board: res.board
                        });
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

    }

    clickme2() {
        this.getGameStatus();
    }

}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

export default withRouter(Game)
