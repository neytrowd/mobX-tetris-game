import Cell from "../Cell";
import styled from "styled-components";

const StyledStage = styled.div`
  display: grid;
  grid-template-rows: repeat(${props => props.height}, calc(25vw / ${props => props.width}));
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #9b9b9b;
  width: 25vw;
`

const Stage = ({ stage }) => {

    return (
        <StyledStage width={stage[0].length} height={stage.length}>
            { stage.map(row => {
                return row.map((cell, index) => {
                    return <Cell key={index} type={cell}/>
                })
            })}
        </StyledStage>
    )
}

export default Stage;