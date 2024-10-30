import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './ErrorMessage.css';

interface ErrorMessageProps {
    message: React.ReactNode;
    classNames: string;
    timeout: number;
    in: boolean;
    unmountOnExit?: boolean;
    // 你可以根据需要添加其他属性
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
                                                       message,
                                                       classNames,
                                                       timeout,
                                                       in: isIn,
                                                       unmountOnExit,
                                                       // 其他属性
                                                   }) => (
    <CSSTransition
        in={isIn}
        timeout={timeout}
        classNames={classNames}
        unmountOnExit={unmountOnExit}
        // 其他属性
    >
        <div className="error-message">
            {message}
        </div>
    </CSSTransition>
);

export default ErrorMessage;