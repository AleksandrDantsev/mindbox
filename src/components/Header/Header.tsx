import stl from "./Header.module.scss";
import { Button } from "antd";
import { Icon } from "@ricons/utils"; 
import { Calendar, Sunny } from "@ricons/carbon";

const Header: React.FC = () => {
    return (
        <header className={stl.header}>
            <div className={stl.header_wrapper}>
                <div className={stl.header_buttons}>
                    <ul className={stl.header_buttons_list}>
                        <li>
                            <Button 
                                type="text" 
                                size="large" 
                                icon={
                                    <Icon size={30} color={"#ffffff"}>
                                        <Calendar />
                                    </Icon>
                                } 
                            />
                        </li>
                        <li>
                            <Button 
                                type="text" 
                                size="large" 
                                icon={
                                    <Icon size={30} color={"#ffffff"}>
                                        <Sunny />
                                    </Icon>
                                } 
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header;
