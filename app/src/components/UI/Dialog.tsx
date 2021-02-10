import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from './Button';

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0.4;
    z-index: 10;
    background-color: black;
    width: 100%;
    height: 100%;
    pointer-events: none;
`;

export const StyledDialog = styled.div`
    position: absolute;
    top: 20%;
    left: 20%;
    z-index: 100;
    border-radius: 10px;
    background-color: white;
    padding: 20px;
    overflow: inherit;
`;

export const Title = styled.div`
    color: #000000;
`;

export const StyledButton = styled(Button)`
    display: inline-block;
    margin: 5px;
    border: 0;
    background-color: pink;
    cursor: pointer;
    padding: 5px;
    line-height: 1;
    font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 700;
`;

export interface DialogProps {
    children?: ReactNode;
    buttons?: ButtonProps[];
    title: ReactNode;
}

export const Dialog: FunctionComponent<DialogProps> = ({ children, buttons, title }) => {
    return (
        <>
            <Overlay />
            <StyledDialog>
                {title && <Title>{title}</Title>}
                {children}
                {buttons &&
                    buttons.map((button) => (
                        <StyledButton key={button.label} label={button.label} onClick={button.onClick} />
                    ))}
            </StyledDialog>
        </>
    );
};
