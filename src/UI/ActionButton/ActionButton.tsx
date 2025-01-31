import React, { memo } from "react";
import stl from "./ActionButton.module.scss";
import { Tooltip } from 'antd';
import { Icon } from "@ricons/utils"; 

interface IActionButton {
    children: React.ReactNode;
    size?: number;
    color?: string;
    maxSize?: number;
    onClick: () => void;
    tooltipText?: string;
    tooltipPlacement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
};

const ActionButton: React.FC<IActionButton> = ({ children, size, color, maxSize, tooltipText, tooltipPlacement, onClick }) => {
    const maxDimension = `${maxSize ?? 35}px`;

    const renderButton = (() => (
        <button 
            className={stl.action_button} 
            type="button" 
            onClick={onClick} 
            style={{ maxHeight: maxDimension, maxWidth: maxDimension }}
            >
            <Icon size={size ?? 25} color={color ?? "#bfbfbf"}>
                {children}
            </Icon>
        </button>
    ))();

    return (
        <React.Fragment>
            {
                tooltipText ? 
                <Tooltip placement={tooltipPlacement ?? "top"} title={tooltipText ?? ""}>
                    {renderButton}
                </Tooltip> : renderButton
            }
        </React.Fragment>
    )
}

export default memo(ActionButton);
