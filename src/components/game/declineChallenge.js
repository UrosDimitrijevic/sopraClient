import {getDomain} from "../../helpers/getDomain";
import {ErrorCode} from "../shared/ErrorHandler/ErrorHandler";

export function declineChallenge(){
    fetch(`${getDomain()}/users/`+localStorage.getItem("id"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            challenging: null,
            gettingChallengedBy: null,
        })
    }).then(response => {
        if( response.status < 200 || response.status >= 300 ) {
            throw new Error( ErrorCode(response.status) );
        }
        else{localStorage.removeItem("gettingChallengedByID")}
        console.log("woweeee")

    })
        .catch(err => {
            if (err.message.match(/Failed to fetch/)) {
                alert("The server cannot be reached. Did you start it?");
            }
        });
}
