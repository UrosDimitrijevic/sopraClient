import {getDomain} from "../../helpers/getDomain";

export function   getGameStatus() {
    let resStatus = 0;
    fetch(`${getDomain()}/game/Board/`+localStorage.getItem("id"), {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then (res => {
            resStatus = res.status;
            if (resStatus === 404 || resStatus === 400 || resStatus !==200){console.log(res)}
            else{
                return  res.json();}
        })
        .then (res => {
            switch (resStatus){
                case 200:

                    if(res.status === "SettingFigurinesp1f1"){
                        clearInterval(this.timer);
                        this.props.history.push("/newboard")
                    }
                    if(res.status === "CHOSING_GAME_MODE"){
                        this.props.history.push("/test")
                    }
                    if(res.status === "CHOSING_GODCARDS"){
                        this.props.history.push("/test")
                    }
                    if(res.status === "PICKING_GODCARDS"){
                        this.props.history.push("/test2")
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
