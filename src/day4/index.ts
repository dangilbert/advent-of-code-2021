import _ from 'lodash';

interface Game {
    inputs: number[];
    boards: number[][][];
}

export const DayClass = {

    mapInput: (input: string[]): Game => {

        const boardsInput = input.slice(2);
        let currentBoard: number[][] = [];
        const boards: number[][][] = [];

        _(boardsInput).forEach((row) => {
            if (row.trim().length == 0) {
                boards.push([...currentBoard]);
                currentBoard = [];
            } else {
                currentBoard.push(row.trim().split(/\s+/).map((value) => parseInt(value)));
            }
        });

        return {
            inputs: input[0].split(",").map((value) => parseInt(value)),
            boards,
        }
    },

    /*
        Part 1
    */

    part1TestResult: 4512,
    part1: (input: Game) => {
        const boardWidth = input.boards[0][0].length;
        const boardHeight = input.boards[0].length;

        const markers = Array.from({ length: input.boards.length }, () => Array.from({ length: boardHeight }, () => Array.from({ length: boardWidth }, () => 0)));

        const winCheck = (bingo: number[][]) => {
            // check for all values equals to 1 in any horizontal row:
            let winner;
            for (var i = 0; i < bingo.length; i++) {
                winner = true;

                for (var j = 0; j < bingo[i].length; j++) {
                    if (bingo[i][j] != 1) {
                        winner = false;
                        break;
                    }
                }

                if (winner) {
                    return true;
                }
            }

            for (var i = 0; i < bingo.length; i++) {
                winner = true;

                for (var j = 0; j < bingo[i].length; j++) {
                    if (bingo[j][i] != 1) {
                        winner = false;
                        break;
                    }
                }

                if (winner) {
                    return true;
                }
            }
            return false;
        }

        const sumBoardUnmatched = (board: number[][], matchers: number[][]): number => {
            let sum = 0;
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[0].length; j++) {
                    if (matchers[i][j] == 0) {
                        sum += board[i][j];
                    }
                }
            }
            return sum;
        }


        for (var i = 0; i < input.inputs.length; i++) {

            const currentInput = input.inputs[i];
            for (var j = 0; j < input.boards.length; j++) {
                // On every board
                const currentBoard = input.boards[j];
                for (var k = 0; k < boardWidth * boardHeight; k++) {
                    // Check the current input in every spot on the board
                    const row = Math.floor(k / boardWidth);
                    const column = k % boardWidth;
                    if (currentBoard[row][column] === currentInput) {
                        markers[j][row][column] = 1;
                    }
                }
                if (i >= Math.min(boardWidth, boardHeight)) {
                    if (winCheck(markers[j])) {
                        // console.log(`Found a winner after ${i} inputs. Current input: ${currentInput}`);
                        // console.log(markers[j]);
                        return sumBoardUnmatched(currentBoard, markers[j]) * currentInput;
                    }
                }
            }
        }
    },

    /*
        Part 2
    */

    part2TestResult: 1924,
    part2: (input: Game) => {
        const boardWidth = input.boards[0][0].length;
        const boardHeight = input.boards[0].length;

        const markers = Array.from({ length: input.boards.length }, () => Array.from({ length: boardHeight }, () => Array.from({ length: boardWidth }, () => 0)));
        const winningBoards: number[] = [];

        const winCheck = (bingo: number[][]) => {
            // check for all values equals to 1 in any horizontal row:
            let winner;
            for (var i = 0; i < bingo.length; i++) {
                winner = true;

                for (var j = 0; j < bingo[i].length; j++) {
                    if (bingo[i][j] != 1) {
                        winner = false;
                        break;
                    }
                }

                if (winner) {
                    return true;
                }
            }

            for (var i = 0; i < bingo.length; i++) {
                winner = true;

                for (var j = 0; j < bingo[i].length; j++) {
                    if (bingo[j][i] != 1) {
                        winner = false;
                        break;
                    }
                }

                if (winner) {
                    return true;
                }
            }
            return false;
        }

        const sumBoardUnmatched = (board: number[][], matchers: number[][]): number => {
            let sum = 0;
            for (var i = 0; i < board.length; i++) {
                for (var j = 0; j < board[0].length; j++) {
                    if (matchers[i][j] == 0) {
                        sum += board[i][j];
                    }
                }
            }
            return sum;
        }


        for (var i = 0; i < input.inputs.length; i++) {

            const currentInput = input.inputs[i];
            for (var j = 0; j < input.boards.length; j++) {
                // On every board
                if (winningBoards.includes(j)) {
                    continue;
                }
                const currentBoard = input.boards[j];
                for (var k = 0; k < boardWidth * boardHeight; k++) {
                    // Check the current input in every spot on the board
                    const row = Math.floor(k / boardWidth);
                    const column = k % boardWidth;
                    if (currentBoard[row][column] === currentInput) {
                        markers[j][row][column] = 1;
                    }
                }
                if (i >= Math.min(boardWidth, boardHeight)) {
                    if (winCheck(markers[j])) {

                        if (winningBoards.length === input.boards.length - 1) {
                            return sumBoardUnmatched(currentBoard, markers[j]) * currentInput;
                        }

                        // Remove the board from the equation as it has already won
                        winningBoards.push(j);
                    }
                }
            }
        }
    },

}