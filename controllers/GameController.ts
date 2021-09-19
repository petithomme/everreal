import { Request, Response, NextFunction } from 'express';
import {BoardGame} from "../models/BoardGame";

export class GameController {

    public getStatus (req: Request, res: Response, _: NextFunction) {
        const board: BoardGame = new BoardGame(5,4);
        board.playAutomaticNext();
        res.status(200).json({data: '---ok--'});
    }

}

