import {Colors} from "../enums/Colors";

export interface Game {
    board: Colors[][];
    colorsAvailable: Colors[];
}
