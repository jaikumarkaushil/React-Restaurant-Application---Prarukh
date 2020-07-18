import styled from 'styled-components';

export const DiagonalSwipe = styled.div`
    display: inline-block;
    background: #DAA520;
    position: absolute;
    top:0;
    left:-100%;
    width: 100%;
    height: 100%;
    transform: skewX(-45deg);
    transition: transform 600ms ease-in-out;
`
export default DiagonalSwipe;