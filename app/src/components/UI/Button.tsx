import React, { FunctionComponent } from 'react';

export interface ButtonProps {
    label: string;
    onClick?: () => void;
}

export const Button: FunctionComponent<ButtonProps> = ({ label, ...props }) => {
    return (
        <button type="button" {...props}>
            {label}
        </button>
    );
};
