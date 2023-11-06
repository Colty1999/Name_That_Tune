import { ReactNode } from 'react';
import './button.scss'

type ButtonProps = {
    children: ReactNode;
} & JSX.IntrinsicElements['button'];

export default function Button({ children, ...attributes }: ButtonProps) {
    return (
        <span className="buttonclass">
            <button
                type="button"
                {...attributes}
            >
                {children}
            </button>
        </span>
    );
}

