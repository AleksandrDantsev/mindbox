import { memo } from "react";
import stl from "./Header.module.scss";
import { Button } from "antd";
import { TTheme } from "../../appSettings";
import ActionButton from "../../UI/ActionButton/ActionButton";
import { Calendar, Sunny, Moon } from "@ricons/carbon";

interface IHeader {
    theme: TTheme;
    changeTheme: () => void;
}

const Header: React.FC<IHeader> = ({ theme, changeTheme }) => {
    return (
        <header className={stl.header}>
            <div className={stl.header_wrapper}>
                <div className={stl.header_buttons}>
                    <ul className={stl.header_buttons_list}>
                        {/* <li>
                            <Button 
                                type="text" 
                                size="large" 
                                icon={
                                    <ActionButton size={30} color={"#ffffff"}>
                                        <Calendar />
                                    </ActionButton>
                                } 
                            />
                        </li> */}
                        <li>
                            {
                                theme === "light" ?
                                    <ActionButton size={30} color={"#ffffff"} onClick={changeTheme}>
                                        <Sunny />
                                    </ActionButton> :
                                    <ActionButton size={30} color={"#ffffff"} onClick={changeTheme}>
                                        <Moon />
                                    </ActionButton>
                            } 
                            
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);
