import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import {ErrorCode} from "../shared/ErrorHandler/ErrorHandler";
import {declineChallenge} from "./declineChallenge";


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
    };
  }
  ChallengeStatus() {
    fetch(`${getDomain()}/users/`+ localStorage.getItem("id"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
        .then(response => response.json())

        .then( response => {
          this.setState({
            user : response,
            challenging : response.challenging,
            gettingChallengedBy : response.gettingChallengedBy
          });

        });}



  challengeUser(){
    fetch(`${getDomain()}/users/`+localStorage.getItem("id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        challenging: this.state.challengingPUT,
      })
    }).then(response => {
      if( response.status < 200 || response.status >= 300 ) {
        throw new Error( ErrorCode(response.status) );
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
    fetch(`${getDomain()}/game/Board/`+localStorage.getItem("id"), {
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
              this.setState({status : res.status});
              console.log(this.state.status);
              return this.props.history.push("/test");

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
    fetch(`${getDomain()}/users/`+localStorage.getItem("id"), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: localStorage.getItem("username"),

      })
    })
        .then(response => {
          if( response.status < 200 || response.status >=300 ) {
            throw new Error( ErrorCode(response.status) );
          }
        })
        .catch(err => {
          console.log(err);
          alert("Something went wrong loggin out: " + err);
        });
    localStorage.removeItem( "id");
    this.props.history.push("/login");
    localStorage.removeItem("username");
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

        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert("Something went wrong fetching the users: " + err);
      });

    if(this.state.challenging === this.state.gettingChallengedBy && (this.state.gettingChallengedBy) && (this.state.challenging)){
      this.getGameStatus();
      this.timer = setInterval(()=>this.getGameStatus(), 10000);
    }
    else{
      this.ChallengeStatus();
      this.timer = setInterval(()=> this.ChallengeStatus(), 10000);
    }
  }
  componentWillUnmount() {
    this.timer = null;
  }

  render() {
    let user = null;
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                      <PlContainer>
                          <a href="#" onClick={()=>{this.props.history.push('/playerPage' ); localStorage.setItem("atID", user.id);} } >
                            {user.username}
                          </a><button
                      onClick={()=> {this.setState({challengingPUT : user.id});
                                    this.challengeUser();
                                    this.ChallengeStatus();
                                    console.log(this.state.gettingChallengedBy)
                      }}
                      disabled={user.id.toString(  )=== localStorage.getItem("id")}>Challenge</button>
                          <PlId>Id: {user.id}</PlId>
                      </PlContainer>
                  </PlayerContainer>
                );
              })}
            </Users>
            <button
                onClick={declineChallenge}
            >Decline </button>
            <Button
              width="100%"
              onClick={() => {

                this.logout();


              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>

    );
  }
}

export default withRouter(Game);
/**
<Player user ={user} />
 **/
