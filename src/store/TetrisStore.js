import {makeObservable, observable, action} from 'mobx';
import {randomShape} from "../shapes";
import {createStage} from "../helpers";
import {STAGE_WIDTH} from "../helpers";

export default class TetrisStore {
    player = {
        collided: false,
        pos: {x: STAGE_WIDTH / 2 - 1, y: 0},
        shape: randomShape().shape
    }
    stage = createStage()
    gameOver = false

    constructor() {
        makeObservable(this, {
            player: observable,
            stage: observable,
            gameOver: observable,
            updatePlayerPos: action,
            resetPlayer: action,
            restart: action
        })

        this.restart = this.restart.bind(this)
    }

    updatePlayerPos(dir) {
        let {x, y, collided} = dir;
        this.player.pos.x += x;
        this.player.pos.y += y;
        this.player.collided = collided;
        this.updateStage();
    }

    resetPlayer() {
        this.player.pos.y = 0;
        this.player.collided = false;
        this.player.pos.x = STAGE_WIDTH / 2 - 2;
        this.player.shape = randomShape().shape;
        this.updateStage();
    }

    checkCollision({x: movX, y: movY}) {
        let {x, y} = this.player.pos;
        for (let posY = 0; posY < this.player.shape.length; posY++) {
            for (let posX = 0; posX < this.player.shape[posY].length; posX++) {
                if (this.player.shape[posY][posX] !== 0) {
                    if (
                        !this.stage[posY + y + movY] ||
                        !this.stage[posY + y + movY][posX + x + movX] ||
                        this.stage[posY + y + movY][posX + x + movX][1] !== 'clear'
                    ) {
                        return true;
                    }
                }
            }
        }
    }

    rotate() {
        let rotated = this.player.shape.map((_, index) =>
            this.player.shape.map(col => col[index])
        )
        this.player.shape = rotated.map(row => row.reverse());
    }

    sweepRows(stage) {
        return stage.reduce((acc, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                acc.unshift(new Array(stage[0].length).fill([0, 'clear']));
                return acc;
            }
            acc.push(row);
            return acc
        }, [])
    }

    updateStage() {
        let newStage = this.stage.map(row =>
            row.map(cell => cell[1] === 'clear' ? [0, 'clear'] : cell)
        )
        this.player.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== 0) {
                    let posY = y + this.player.pos.y;
                    let posX = x + this.player.pos.x;
                    newStage[posY][posX] = [
                        cell,
                        `${this.player.collided ? 'merged' : 'clear'}`
                    ]
                }
            })
        })

        if (this.player.collided) {
            this.resetPlayer()
            this.stage = this.sweepRows(newStage)
            return;
        }

        this.stage = newStage;
    }

    restart() {
        this.gameOver = false;
        this.player = {
            collided: false,
            pos: {x: STAGE_WIDTH / 2 - 1, y: 0},
            shape: randomShape().shape
        }
        this.stage = createStage()
        this.updateStage();
    }
}