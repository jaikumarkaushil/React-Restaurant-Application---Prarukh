import styled from 'styled-components';

import DiagonalSwipe from './diagonalSwipe';

export const Trigger = styled.div`
    width: 100%;
    &:hover ${DiagonalSwipe} {
    transform: translateX(100%);
    cursor: pointer;
    }
`

export default Trigger;