import Apollo from "./Apollo.PNG";
import Artemis from "./Artemis.PNG";
import Athena from "./Athena.PNG";
import Atlas from "./Atlas.PNG";
import Demeter from "./Demeter.PNG";
import Hephaestus from "./Hephaestus.PNG";
import Hermes from "./Hermes.PNG";
import Minotaur from "./Minotaur.PNG";
import Pan from "./Pan.PNG";
import Prometheus from "./Prometheus.PNG";

import "./img_text.css";

const data = {
    "properties": [
        {
            "index": 0,
            "picture": Apollo,
            "text": "Your Move: Your Worker may move into an opponent Worker’s space by forcing their Worker to the space yours just vacated. ",
            "title": "God Of Music"
        },
        {
            "index": 1,
            "picture": Artemis,
            "text": "Your Move: Your Worker may move one additional time, but not back to its initial space. ",
            "title": "Goddess of the Hunt"
        },
        {
            "index": 2,
            "picture": Athena,
            "text": "Opponent’s Turn: If one of your Workers moved up on your last turn, opponent Workers cannot move up this turn. ",
            "title": "Goddess of Wisdom "
        },
        {
            "index": 3,
            "picture": Atlas,
            "text": "Your Build: Your Worker may build a dome at any level.",
            "title": "Titan Shouldering the Heavens "
        },
        {
            "index": 4,
            "picture": Demeter,
            "text": "Your Build: Your Worker may build one additional time, but not on the same space.  ",
            "title": "Goddess of the Harvest "
        },
        {
            "index": 5,
            "picture": Hephaestus,
            "text": "Your Build: Your Worker may build one additional block (not dome) on top of your first block",
            "title": "God of Blacksmiths "
        },
        {
            "index": 6,
            "picture": Hermes,
            "text": "God of Travel Your Turn: If your Workers do not move up or down, they may each move any number of times (even zero), and then either builds. ",
            "title": "God of Travel "
        },
        {
            "index": 7,
            "picture": Minotaur,
            "text": "Your Move: Your Worker may move into an opponent Worker’s space, if their Worker can be forced one space straight backwards to an unoccupied space at any level. ",
            "title": "Bull-headed Monster "
        },
        {
            "index": 8,
            "picture": Pan,
            "text": "Win Condition: You also win if your Worker moves down two or more levels. ",
            "title": "God of the Wild "
        },
        {
            "index": 9,
            "picture": Prometheus,
            "text": "Your Turn: If your Worker does not move up, it may build both before and after moving. ",
            "title": "Titan Benefactor of Mankind "
        }
        ]
};

export default data;