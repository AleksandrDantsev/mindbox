import { memo } from "react";
import stl from "./Header.module.scss";
import { TTheme } from "../../appSettings";
import ActionButton from "../../UI/ActionButton/ActionButton";
import { Sunny, Moon } from "@ricons/carbon";

interface IHeader {
    theme: TTheme;
    changeTheme: () => void;
}

const Header: React.FC<IHeader> = ({ theme, changeTheme }) => {

    const currentThemeIcon = theme === "light" ? <Sunny /> : <Moon />;

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
                            <ActionButton size={30} color={"#ffffff"} onClick={changeTheme}>
                                {currentThemeIcon}
                            </ActionButton> 
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);
