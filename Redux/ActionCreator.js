import { addTodo ,doTodo,removeTodo } from "./actions.js"


const AddTodoAction =(title)=>{
    return{
        type:addTodo,
        title:title
    }
}
const RemoveTodoAction =(id)=>{
    return{
        type:removeTodo,
        id:id
    }
}
const DoTodoAction =(id)=>{
    return{
        type:doTodo,
        id:id
    }
}


export {AddTodoAction,RemoveTodoAction,DoTodoAction }