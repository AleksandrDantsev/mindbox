import stl from "./TodoList.module.scss";


const TodoList: React.FC = () => {
    return (
        <div className={stl.todo_block}>
            <div className={stl.todo_conteiner}>
                <div className={stl.todo_adding_search}>

                </div>
                <div className={stl.todo_list}></div>
                <div className={stl.todo_info_actions}></div>
            </div>
        </div>
    )
}

export default TodoList;
