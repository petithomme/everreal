import { Request, Response, NextFunction } from 'express';
import {Game} from "../models/Game";
import {Colors} from "../enums/Colors";

export class GameController {

    private getRandomColors(colorsAmount: number): Colors[] {
        let colorsAvailable: Colors[] = Object.keys(Colors).map(x => parseInt(x)).filter(x => !isNaN(x));
        while (colorsAvailable.length > colorsAmount) {
            colorsAvailable.splice(colorsAvailable.length * Math.random(), 1);
        }
        return colorsAvailable;
    }

    private fillNewBoard(size: number, colorsAvailable: Colors[]): Colors[][] {
        let board: Colors[][] = [];
        for (let i: number=0; i< size; i++) {
            board[i] = [];
            for (let j: number=0; j< size; j++) {
                board[i].push(colorsAvailable[Math.floor(colorsAvailable.length * Math.random())]);
            }
        }

        return board;
    }

    private createRandomGame(size: number, colorsAmount: number): Game {
        const colorsAvailable: Colors[] = this.getRandomColors(colorsAmount);
        const board: Colors[][] = this.fillNewBoard(size, colorsAvailable);
        return {
            board,
            colorsAvailable
        }
    }

    public getStatus (req: Request, res: Response, _: NextFunction) {
        res.status(200).json({data: '---ok--'});
    }

}

