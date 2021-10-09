import styled from 'styled-components';
// import { shapes } from "../../shapes";

const StyledCell = styled.div`
  width: auto;
  background: rgba(${ props => props.type[0] === 1 ? `0,0,0` : '255,255,255' }, 0.7);
  border: 1px solid #000;
`

const Cell = ({ type }) => {

    return (
        <StyledCell type={type}>

        </StyledCell>
    )
}

export default Cell;