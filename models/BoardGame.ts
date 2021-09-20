import {Colors} from "../enums/Colors";
import {Position} from "./Position";
import {Cell} from "./Cell";

export class BoardGame {

    private adjacentPositions: Position[] = [{x:-1, y:0}, {x:+1, y:0}, {x:0, y:-1},{x:0, y:+1}];
    public board: Colors[][];
    public done: boolean = false;

    constructor() {
        this.board = [];
    }

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

    private createRandomGame(size: number, colorsAmount: number): Colors[][] {
        const colorsAvailable: Colors[] = this.getRandomColors(colorsAmount);
        return this.fillNewBoard(size, colorsAvailable);
    }

    private canStopRecursion(currentPosition: Position, size: number, alreadyTested: Position[]): boolean {
        return currentPosition.x < 0 || currentPosition.x >= size ||
               currentPosition.y < 0 || currentPosition.y >= size ||
               this.alreadyTested(currentPosition, alreadyTested)
    }

    private getConnectedCells(): Position[] {
        const connectedCells: Position[] = [];
        this.getConnectedCell(connectedCells, {x:0, y:0}, this.board[0][0], this.board.length, []);
        return connectedCells;
    }

    private getConnectedCell(connectedCells: Position[], currentPosition: Position, color: Colors, size: number, alreadyTested: Position[]): void {
        if (!this.canStopRecursion(currentPosition, size, alreadyTested)) {
            alreadyTested.push(currentPosition);
            if (this.board[currentPosition.x][currentPosition.y] == color) {
                connectedCells.push( currentPosition);
                this.adjacentPositions.forEach( pos => {
                    this.getConnectedCell(connectedCells, {x: currentPosition.x + pos.x, y: currentPosition.y + pos.y}, color, size, alreadyTested);
                });
            }
        }
    }

    private getEdgeCells(): Cell[] {
        const edgeCells: Cell[] = [];
        this.checkEdgeCells(edgeCells, {x:0, y:0}, this.board[0][0], this.board.length, []);
        return edgeCells;
    }

    private checkEdgeCells(edgeCells: Cell[], currentPosition: Position, colorToCheck: Colors, size: number, alreadyTested: Position[]): void {
        if (!this.canStopRecursion(currentPosition, size, alreadyTested)) {
            alreadyTested.push(currentPosition);
            if (this.board[currentPosition.x][currentPosition.y] != colorToCheck) {
                edgeCells.push( {position: currentPosition, color: this.board[currentPosition.x][currentPosition.y] });
            } else {
                this.adjacentPositions.forEach( pos => {
                    this.checkEdgeCells(edgeCells, {x: currentPosition.x + pos.x, y: currentPosition.y + pos.y}, colorToCheck, size, alreadyTested);
                });
            }
        }
    }

    private alreadyTested(position: Position, alreadyTested: Position[]): boolean {
        return alreadyTested.filter( pos => pos.x == position.x && pos.y == position.y).length > 0;
    }

    private getMostFrequentColorInCells(cells: Cell[]): Colors {
        const colors: object = {};
        let max: number = 0;
        let savedIndex: number = -1;
        cells.map( (cell: Cell) => colors[cell.color] = (colors[cell.color] || 0) + 1 );
        Object.values(colors).forEach( (value, index) => { if (value > max) { savedIndex = index; }});
        return cells[savedIndex].color;
    }

    private isColorValid(color:Colors): boolean {
        let result: boolean = false;
        this.board.forEach( (values) => values.forEach( v => {
            if (v == color) {
                result = true;
            }
        }));
        return result;
    }

    private changeColors(color: Colors): void {
        if (this.isColorValid(color)) {
            var cells: Position[] = this.getConnectedCells();
            cells.forEach((pos) => {
                this.board[pos.x][pos.y] = color;
            });
        }
    }

    private isFinished(): boolean {
        let result: boolean = true;
        this.board.forEach( (values => {
            const same: boolean = values.every( v => v == this.board[0][0]);
            if (!same) {
                result = false;
            }
        }));
        return result;
    }

    public init(size: number, colorsAmount: number): void {
        this.board = this.createRandomGame(size, colorsAmount);
        this.done = this.isFinished();
    }

    public initFromValues(newValues: Colors[][]): void {
        this.board = newValues;
        this.done = this.isFinished();
    }

    public playAutomatic(): void {
        while (!this.isFinished()) {
            this.changeColors(this.getMostFrequentColorInCells(this.getEdgeCells()));
        };
        this.done = true;
    }

    public playAutomaticNext(): void {
        if (!this.done) {
            this.changeColors(this.getMostFrequentColorInCells(this.getEdgeCells()));
            this.done = this.isFinished();
        }
    }

    public play(color: Colors): void {
        if (!this.done) {
            this.changeColors(color);
            this.done = this.isFinished();
        }
    }
}
