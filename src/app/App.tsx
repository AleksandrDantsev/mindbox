import { useState } from "react";
import { appSetting, type TTheme } from "../appSettings";
import stl from "./App.module.scss";
import Header from "../components/Header/Header";
import TodoList from "../pages/TodoList/TodoList";

const settings = appSetting;
const checkSupportDeviceAnim = settings.checkSupportDevice();


const App: React.FC = () => {
    const [theme, setTheme] = useState<TTheme>(settings.theme);

    const changeTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    }

    return (
        <div className={`${stl.wrapper} ${theme === "light" ? stl.light_theme : stl.dark_theme} ${checkSupportDeviceAnim || stl.animation_background}`}>
            <Header changeTheme={changeTheme} theme={theme} />
            <main className={stl.main}>
                <TodoList />
            </main>
        </div>
    )
}

export default App;
