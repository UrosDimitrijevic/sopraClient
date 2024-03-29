import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import Registration from "../../registration/Registration"
import PlayerPage from  "../../PlayerPage/PlayerPage"
import PlayerPageEdit from "../../PlayerPage/PlayerPageEdit"
import ChooseGodCard from "../../game/ChooseGodCard";
import NewBoard from "../../Board/newBoard";

import GameManual from "../../../GodCards/GameManual";

import TwoGodCards from "../../game/TwoGodCards";
import ChooseGameMode from "../../game/ChooseGameMode";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
            <Route
                path = "/registration"
                render= { () => (
                    <Registration />
                )}
            />
            <Route
                path = '/playerPage'
                render = { () =>(
                    <GameGuard>
                        <PlayerPage />
                    </GameGuard>
                ) }
            />
            <Route
               path = '/playerPageEdit'
               render = { () =>(
                   <GameGuard>
                       <PlayerPageEdit />
                  </GameGuard>
               ) }
            />
              <Route
                  path="/gameMode"
                  exact
                  render={() => (
                      <ChooseGameMode/>
                  )}
              />
            <Route
                path="/test"
                exact
                render={() => (
                    <ChooseGodCard/>
                  )}
            />
              <Route
                  path="/test2"
                  exact
                  render={() => (
                      <TwoGodCards/>
                  )}
              />
              <Route
                  path="/Santorini"
                  exact
                  render={() => (
                      <NewBoard/>
                  )}
              />
              <Route
                  path="/GameManual"
                  exact
                  render={() => (
                      <GameManual/>
                  )}
              />
            <Route path="/" exact render={() => <Redirect to={"/login"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;
