import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import * as ReactDOM from "react-dom";
import {BaseContainer} from "../../helpers/layout";

import './boardindex.css';
import {getDomain} from "../../helpers/getDomain";


class Square extends React.Component {

    render() {
        if(this.props.level === 0){
        return (
            <button className="square">
                {this.props.row}, {this.props.column}, {this.props.level}
            </button>
        );}
        else {
            return(
                <button className="square2">
                    {this.props.row}, {this.props.column}, {this.props.level}
                </button>
            );
        }
    }
}

class Board extends React.Component {
    constructor(){
        super();
        this.state = {
            "board": {
                "spaces": [
                    [
                        {
                            "level": 0,
                            "dome": false
                        },
                        {
                            "level": 11111,
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
                            "level": 1231231,
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
        }
    }
    componentDidMount() {
        this.getGameStatus();

    }
    clickMe (){
        console.log(this.state.status);
        console.log(this.state.board.spaces[0][0].level);
        console.log(this.state.board.spaces[0][1].level);
        this.setState({board: {
                "spaces": [
                    [
                        {
                            "level": 123123,
                            "dome": false
                        },
                        {
                            "level": 11111,
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
                            "level": 1231231,
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
            },})

    }
    clickme2(){
        this.getGameStatus();
    }

    createTable = (board) => {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < 5; i++) {
            let BoardRow = [];
            //Inner loop to create children
            for (let j = 0; j < 5; j++) {
                BoardRow.push(this.renderSquare(i,j, this.state.board.spaces[i][j].level))
            }
            //Create the parent and add the children
            table.push(<div className="board-row">{BoardRow}</div>)
        }
        return table
    };



    renderSquare(row, column, level, dome) {
        return <Square row={row} column = {column} level = {level}/>;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>

                {this.createTable(this.state.board)}
                <button
                    onClick={() => this.clickMe()}
                >asdf</button>
                <button
                    onClick={() => this.clickme2()}
                >asdfqweqwe</button>
            </div>
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
            .then (res => {
                resStatus = res.status;
                if (resStatus === 404 || resStatus === 400){console.log(res)}
                else{
                    return  res.json();}
            })
            .then (res => {
                switch (resStatus){
                    case 200:
                        this.setState({
                            status : res.status,
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
}

class Game extends React.Component {


    render() {
        return (
            <BaseContainer>
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <ol>{/* TODO */}</ol>
                </div>

            </div>
        </BaseContainer>
        );
    }

}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

export default withRouter(Game)
