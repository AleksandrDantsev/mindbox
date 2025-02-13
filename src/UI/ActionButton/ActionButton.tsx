import React, { memo } from "react";
import stl from "./ActionButton.module.scss";
import { Tooltip } from 'antd';
import { CustomIcon } from "../../utils/customIcon";
import type { TTooltipPlacement } from "../../types/TTooltip";

interface IActionButton {
    children?: React.ReactNode;
    size?: number;
    color?: string;
    maxSize?: number;
    onClick?: () => void;
    tooltipText?: string;
    tooltipPlacement?: TTooltipPlacement;
    disabled?: boolean;
    visible?: boolean;
};

const ActionButton: React.FC<IActionButton> = (
    { children, size, color, maxSize, tooltipText, tooltipPlacement, onClick, disabled, visible }
) => {
    const maxDimension = `${maxSize ?? 35}px`;
    const isVisible = visible ?? true;

    const renderButton = (() => (
        <button 
            type="button" 
            className={stl.action_button + ` ${disabled ? stl?.disableClass : ""}` + ` ${isVisible ? "" : stl?.unvisible}`} 
            style={{ maxHeight: maxDimension, maxWidth: maxDimension }}
            onClick={onClick} 
        >
            {CustomIcon(children, size ?? 25, color || "#ababab")}
        </button>
    ))();

    return tooltipText && !disabled && isVisible ? 
        <Tooltip 
            placement={tooltipPlacement ?? "top"} 
            title={tooltipText ?? ""} 
            mouseEnterDelay={0.3}
        >
            {renderButton}
        </Tooltip> : renderButton
}

export default memo(ActionButton);
