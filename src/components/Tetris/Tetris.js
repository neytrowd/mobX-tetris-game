import { useState,useEffect } from 'react';
import Stage from "../Stage";
import styled from "styled-components";
import GameOver from "../GameOver";
import { observer } from "mobx-react";

const StyledWrap = styled.div`
  position: relative;
`

const Tetris = observer(({ store }) => {
    let [id, setId] = useState(null);

    function updatePlayerPos(dir) {
        store.updatePlayerPos(dir);
    }

    function movePlayer(dir) {
        let direction = { x: dir, y: 0 }
        if(!store.checkCollision(direction)){
            updatePlayerPos(direction)
        }
    }

    function dropPlayer() {
        let direction = { x: 0, y: 1, collided: false }
        if(!store.checkCollision(direction)) {
            updatePlayerPos(direction)
        }
        else {
            if(store.player.pos.y < 1) {
                store.gameOver = true;
            }
            updatePlayerPos({ x: 0, y: 0, collided: true })
        }
    }

    function moveShape({ keyCode }) {
        if(!store.gameOver) {
            if(keyCode === 37) {
                movePlayer(-1);
                return;
            }
            if(keyCode === 38) {
                store.rotate();
            }
            if(keyCode === 39) {
                movePlayer(1);
                return;
            }
            if(keyCode === 40) {
                dropPlayer();
            }
        }
    }

    function restart() {
        store.restart();
        setId(setInterval(() => dropPlayer(),400));
    }

    useEffect(() => {
        store.updateStage();
        let callback = (e) => moveShape(e)
        document.addEventListener('keydown', callback)
        setId(setInterval(() => dropPlayer(),400));

        return () => {
            document.removeEventListener('keydown', callback)
        }
    },[])

    return (
        <StyledWrap>
            <Stage stage = {store.stage}/>
            { store.gameOver && <GameOver id={id} callback={restart}/> }
        </StyledWrap>
    )
})

export default Tetris;