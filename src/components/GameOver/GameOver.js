import { useEffect } from 'react';
import styled from "styled-components";


const StyledOver = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, .8);
  padding-top: 100px;
  text-align: center;
  
  p{
    color: crimson;
    font-size: 45px;
    margin-bottom: 20px;
    font-family: Arial, sans-serif;
  }
  
  button {
    padding: 8px 20px;
    border: none;
    background: chocolate;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
`

const GameOver = ({ callback, id }) => {

    useEffect(() => {
        clearInterval(id);
    })

    return (
        <StyledOver>
            <div>
                <p>Конец игры</p>
                <button onClick={callback}>Еще?</button>
            </div>
        </StyledOver>
    )
}

export default GameOver;