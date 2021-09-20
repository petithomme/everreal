import { Request, Response } from 'express';
import {BoardGame} from "../models/BoardGame";
import * as fs from "fs";

export class GameController {

    private getBoard(): BoardGame {
        const data: string = fs.readFileSync("./tmp/board.txt", 'utf8');
        const game: BoardGame = new BoardGame();
        const newValues: any[][] = data.split("-").map( v => {return v.split(",")});
        newValues.forEach( (values) => {
            values.forEach( (v, index) => values[index] = +values[index]);
        })
        game.initFromValues(newValues);
        return game;
    }

    public getStatus (req: Request, res: Response): void {
        const game: BoardGame = this.getBoard();
        res.status(200).json({data: game.board, done: game.done});
    }

    public startNewGame(req: Request, res: Response): void {
        const size: number = parseInt(<string>req.query.size) || 6;
        const colorsAmount: number = parseInt(<string>req.query.colorsAmount) || 4;
        const game: BoardGame = new BoardGame();
        game.init(size,colorsAmount);
        fs.writeFileSync("./tmp/board.txt", game.board.join("-"));
        res.status(200).json({data: game.board});
    }

    public autoPlay(req: Request, res: Response): void {
        const game: BoardGame = this.getBoard();
        game.playAutomaticNext();
        fs.writeFileSync("./tmp/board.txt", game.board.join("-"));
        res.status(200).json({data: game.board, done: game.done});
    }

    public play(req: Request, res: Response): void {
        if (req.query.color === undefined) {
            res.status(500).json({error : "Color is missing from query"});
        } else {
            const color: number = parseInt(<string>req.query.color);
            const game: BoardGame = this.getBoard();
            game.play(color);
            fs.writeFileSync("./tmp/board.txt", game.board.join("-"));
            res.status(200).json({data: game.board, done: game.done});
        }
    }
}

