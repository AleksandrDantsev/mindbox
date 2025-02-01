import React, { memo }  from "react";
import stl from "./CompleteButton.module.scss";

interface ICompleteButton {
    isCompleted: boolean;
    onChange: (checked: boolean) => void; 
}

const CompleteButton: React.FC<ICompleteButton> = ({ isCompleted, onChange }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCheckedState = e.target.checked;
        onChange(newCheckedState);
    };

    return (
        <label className={stl.custom_checkbox}>
            <input 
                type="checkbox" 
                checked={isCompleted} 
                onChange={handleChange} 
            />
            <span className={stl.checkmark}></span>
        </label>
    )
}

export default memo(CompleteButton);
