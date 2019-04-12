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
            "text": "God Of Music Your Move: Your Worker may move into an opponent Worker’s space by forcing their Worker to the space yours just vacated. "
        },
        {
            "index": 1,
            "picture": Artemis,
            "text": "Goddess of the Hunt Your Move: Your Worker may move one additional time, but not back to its initial space. "

        },
        {
            "index": 2,
            "picture": Athena,
            "text": "Goddess of Wisdom Opponent’s Turn: If one of your Workers moved up on your last turn, opponent Workers cannot move up this turn. "
        },
        {
            "index": 3,
            "picture": Atlas,
            "text": "Titan Shouldering the Heavens Your Build: Your Worker may build a dome at any level. 4"
        },
        {
            "index": 4,
            "picture": Demeter,
            "text": "Goddess of the Harvest Your Build: Your Worker may build one additional time, but not on the same space.  "
        },
        {
            "index": 5,
            "picture": Hephaestus,
            "text": "God of Blacksmiths Your Build: Your Worker may build one additional block (not dome) on top of your first block"
        },
        {
            "index": 6,
            "picture": Hermes,
            "text": "God of Travel Your Turn: If your Workers do not move up or down, they may each move any number of times (even zero), and then either builds. "
        },
        {
            "index": 7,
            "picture": Minotaur,
            "text": "Bull-headed Monster Your Move: Your Worker may move into an opponent Worker’s space, if their Worker can be forced one space straight backwards to an unoccupied space at any level. "
        },
        {
            "index": 8,
            "picture": Pan,
            "text": "God of the Wild Win Condition: You also win if your Worker moves down two or more levels. "
        },
        {
            "index": 9,
            "picture": Prometheus,
            "text": "Titan Benefactor of Mankind Your Turn: If your Worker does not move up, it may build both before and after moving. "
        }
        ]
};

export default data;