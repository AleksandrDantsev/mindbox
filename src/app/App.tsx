import stl from "./App.module.scss";
import Header from "../components/Header/Header";
import TodoList from "../pages/TodoList/TodoList";

const App: React.FC = () => {
    return (
        <div className={`${stl.wrapper} ${stl.light_theme}`}>
            <Header />
            <main className={stl.main}>
                <TodoList />
            </main>
        </div>
    )
}

export default App;
