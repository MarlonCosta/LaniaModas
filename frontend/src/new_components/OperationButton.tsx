import React from 'react';

const OperationButton = ({icon, text, onClick, color}: { icon: any, text:string, onClick: any, color: any }) => {
    return (
        <button className="operation-button" onClick={onClick} style={{backgroundColor: color}}>
            {icon} {text}
        </button>
    )
}

export default OperationButton;
