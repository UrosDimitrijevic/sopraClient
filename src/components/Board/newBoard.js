import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import * as ReactDOM from "react-dom";
import {BaseContainer} from "../../helpers/layout";
import Test1 from "./initGameStatus";
import Test2 from "./test2";
import actionstest1 from "./actionstest1";
import './boardindex.css';
import {getDomain} from "../../helpers/getDomain";
import figure from "./figuretest.PNG"


class Square extends React.Component {

/*
<div className="square3">
<img alt={"qwerwe"} width={50} height={50} src = {figure}/></div>*/

    render() {
        if (this.props.action === null) {
            return (
                <button className="square"
                        onClick={console.log(this.props.actions)}
                        disabled={this.props.action === null}
                >

                    {this.props.row}, {this.props.column}, {this.props.level}

                </button>
            );
        } else {
            return (
                <button className="square2"
                        onClick={() => {
                            console.log(this.props.row,  this.props.column, this.props.level, this.props.action)
                        }}
                >
                    {this.props.row}, {this.props.column}, {this.props.level}
                </button>
            );
        }
    }
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: actionstest1
        }

    }

    clickme3() {
        console.log(this.state.actions);
        console.log(this.state.actions.length)
    }

    createTable = (board, actions) => {
        let table = [];
        for (let i = 0; i < 5; i++) {
            let BoardRow = [];
            for (let j = 0; j < 5; j++) {
                BoardRow.push(this.renderSquare(i, j, board.spaces[i][j].level, board.spaces[i][j].dome, actions));
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
        }
        else{
            return null;
        }
    }

    renderSquare(row, column, level, dome, actions) {
        return <Square action={this.checkAction(actions, row, column)} row={row} column={column} level={level}
                       />;
    }

    render() {
        const status = this.props.status;

        return (
            <div>
                <div className="status">{status}</div>
                {this.createTable(this.props.board, this.state.actions)}
                <button onClick={() => this.clickme3()}>Actions</button>

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
                        <Board status={this.state.status} board={this.state.board}/>
                    </div>
                    <div className="game-info">
                        <div>{}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
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
        this.getGameStatus();

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
