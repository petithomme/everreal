import {Colors} from "../enums/Colors";
import {Position} from "./Position";
import {Cell} from "./Cell";

export interface Board {
    values: Colors[][];
    colorsAvailable: Colors[];
}

export class BoardGame {

    public board: Board;

    constructor(size: number, colorsAmount: number) {
        this.board = this.createRandomGame(size, colorsAmount);
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

    private createRandomGame(size: number, colorsAmount: number): Board {
        const colorsAvailable: Colors[] = this.getRandomColors(colorsAmount);
        const values: Colors[][] = this.fillNewBoard(size, colorsAvailable);
        return {values, colorsAvailable }
    }

    private canStopRecursion(currentPosition: Position, size: number, alreadyTested: Position[]): boolean {
        return currentPosition.x < 0 || currentPosition.x >= size ||
               currentPosition.y < 0 || currentPosition.y >= size ||
               this.alreadyTested(currentPosition, alreadyTested)
    }

    private getConnectedCells(): Position[] {
        const connectedCells: Position[] = [];
        this.getConnectedCell(connectedCells, {x:0, y:0}, this.board.values[0][0], this.board.values.length, []);
        return connectedCells;
    }

    private getConnectedCell(connectedCells: Position[], currentPosition: Position, color: Colors, size: number, alreadyTested: Position[]): void {
        if (!this.canStopRecursion(currentPosition, size, alreadyTested)) {
            alreadyTested.push(currentPosition);
            if (this.board.values[currentPosition.x][currentPosition.y] == color) {
                connectedCells.push( currentPosition);
                this.getConnectedCell(connectedCells, {x: currentPosition.x - 1, y: currentPosition.y}, color, size, alreadyTested);
                this.getConnectedCell(connectedCells, {x: currentPosition.x + 1, y: currentPosition.y}, color, size, alreadyTested);
                this.getConnectedCell(connectedCells, {x: currentPosition.x, y: currentPosition.y - 1}, color, size, alreadyTested);
                this.getConnectedCell(connectedCells, {x: currentPosition.x, y: currentPosition.y + 1}, color, size, alreadyTested);
            }
        }
    }

    private getEdgeCells(): Cell[] {
        const edgeCells: Cell[] = [];
        this.checkEdgeCells(edgeCells, {x:0, y:0}, this.board.values[0][0], this.board.values.length, []);
        return edgeCells;
    }

    private checkEdgeCells(edgeCells: Cell[], currentPosition: Position, colorToCheck: Colors, size: number, alreadyTested: Position[]) {
        if (!this.canStopRecursion(currentPosition, size, alreadyTested)) {
            alreadyTested.push(currentPosition);
            if (this.board.values[currentPosition.x][currentPosition.y] != colorToCheck) {
                edgeCells.push( {position: currentPosition, color: this.board.values[currentPosition.x][currentPosition.y] });
            } else {
                this.checkEdgeCells(edgeCells, {x: currentPosition.x - 1, y: currentPosition.y}, colorToCheck, size, alreadyTested);
                this.checkEdgeCells(edgeCells, {x: currentPosition.x + 1, y: currentPosition.y}, colorToCheck, size, alreadyTested);
                this.checkEdgeCells(edgeCells, {x: currentPosition.x, y: currentPosition.y - 1}, colorToCheck, size, alreadyTested);
                this.checkEdgeCells(edgeCells, {x: currentPosition.x, y: currentPosition.y + 1}, colorToCheck, size, alreadyTested);
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

    private changeColors(color: Colors): void {
        console.log(color);
        var cells: Position[] = this.getConnectedCells();
        cells.forEach( (pos) => {
            this.board.values[pos.x][pos.y] = color;
        })
    }

    public playAutomaticNext(): void {
        this.changeColors(this.getMostFrequentColorInCells(this.getEdgeCells()));
    }


}
