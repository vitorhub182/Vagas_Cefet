

import styled, { css } from "styled-components";
import { boolean } from "zod";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    & + & {
    margin-top: 0.8rem;
    }

`;

export const Label = styled.label`
    color: black;
    font-size: 1rem;
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;

    
`;

export const Input = styled.input<{hasError: boolean}>`
    display: flex;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc; 
    
    &:focus{
    border-color: #5300bf;
    outline: 2px solid #ccc ;
    }

    &::placeholder{
    color: #ccc;
    }

    ${({ hasError})=>
        hasError && css`
            border-color: red
        `
    }
`;

export const HelperText = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-top:0.5rem;
`



