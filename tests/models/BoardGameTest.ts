import {BoardGame} from "../../models/BoardGame";
import {Colors} from "../../enums/Colors";

var assert = require('assert');

describe('BoardGame', function() {
    describe('Generate', function() {
        it('should return a new board game with size 6', function() {
            const game: BoardGame = new BoardGame();
            game.init(6,1);
            assert.equal(game.board.length, 6);
        });
        it('should return a new board game with size 3', function() {
            const game: BoardGame = new BoardGame();
            game.init(3,1);
            assert.equal(game.board.length, 3);
        });
        it('should return a new board game with 1 color', function() {
            const game: BoardGame = new BoardGame();
            game.init(4,1);
            game.board.forEach( values => {
                assert.equal(values.every( v => v === values[0]), true);
            })
        });
        it('should return a new board game with 3 colors', function() {
            const game: BoardGame = new BoardGame();
            game.init(4,3);
            const colors: object = {};
            game.board.forEach( values => {
                values.map( v => colors[v] = (colors[v] || 0)+1);
            })
            assert.equal(Object.keys(colors).length, 3);
        });
    });

    describe('Check auto play', function() {
        it('should change colors of connected cells 1', function() {
            const game: BoardGame = new BoardGame();
            game.initFromValues([
                [0,0,1,1,2,2],
                [0,1,1,1,2,2],
                [1,1,1,1,2,2],
                [2,2,2,2,2,2],
                [0,0,1,1,2,2],
                [0,0,1,1,2,2]
            ]);
            game.playAutomaticNext();
            const theoricalResult: Colors[][] = [
                [1,1,1,1,2,2],
                [1,1,1,1,2,2],
                [1,1,1,1,2,2],
                [2,2,2,2,2,2],
                [0,0,1,1,2,2],
                [0,0,1,1,2,2]
            ]
            assert.deepEqual(game.board, theoricalResult);
        });
        it('should change colors of connected cells 2', function() {
            const game: BoardGame = new BoardGame();
            game.initFromValues([
                [0,0,1,1,2,2],
                [0,1,1,1,2,2],
                [0,2,1,1,2,2],
                [0,0,2,2,2,2],
                [2,2,1,1,2,2],
                [0,0,1,1,2,2]
            ]);
            game.playAutomaticNext();
            const theoricalResult: Colors[][] = [
                [2,2,1,1,2,2],
                [2,1,1,1,2,2],
                [2,2,1,1,2,2],
                [2,2,2,2,2,2],
                [2,2,1,1,2,2],
                [0,0,1,1,2,2]
            ]
            assert.deepEqual(game.board, theoricalResult);
        });
        it('Check auto play is done', function() {
            const game: BoardGame = new BoardGame();
            game.initFromValues([
                [0,0,1,1,1,1],
                [0,1,1,1,1,1],
                [0,1,1,1,1,1],
                [0,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1]
            ]);
            game.playAutomaticNext();
            const theoricalResult: Colors[][] = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1]
            ]
            assert.equal(game.done, true);
        });
    });

    describe('Describe play', function() {
        it('Check manual play', function() {
            const game: BoardGame = new BoardGame();
            game.initFromValues([
                [0,0,1,1,2,2],
                [0,1,1,1,2,2],
                [0,2,1,1,2,2],
                [0,0,2,2,2,2],
                [2,2,1,1,2,2],
                [0,0,1,1,2,2]
            ]);
            game.play(Colors.Red);
            const theoricalResult: Colors[][] = [
                [1,1,1,1,2,2],
                [1,1,1,1,2,2],
                [1,2,1,1,2,2],
                [1,1,2,2,2,2],
                [2,2,1,1,2,2],
                [0,0,1,1,2,2]
            ]
            assert.deepEqual(game.board, theoricalResult);
        });
        it('Check manual play is done', function() {
            const game: BoardGame = new BoardGame();
            game.initFromValues([
                [0,0,1,1,1,1],
                [0,1,1,1,1,1],
                [0,1,1,1,1,1],
                [0,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1]
            ]);
            game.play(Colors.Red);
            const theoricalResult: Colors[][] = [
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1],
                [1,1,1,1,1,1]
            ]
            assert.equal(game.done, true);
        });
    });
});

