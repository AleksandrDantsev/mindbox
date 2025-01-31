import { useState } from "react";
import stl from "./CompleteButton.module.scss";


interface ICompleteButton {
    isCompleted: boolean;
    onChange: (checked: boolean) => void; 
}

const CompleteButton: React.FC<ICompleteButton> = ({ isCompleted, onChange }) => {
    const [isChecked, setIsChecked] = useState<boolean>(isCompleted);

    const handleChange = () => {
        onChange(!isChecked);
        setIsChecked(!isChecked);
    }

    return (
        <label className={stl.custom_checkbox}>
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={handleChange} 
            />
            <span className={stl.checkmark}></span>
        </label>
    )
}

export default CompleteButton;
