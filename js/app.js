
import {addTodo,removeTodo,doTodo,filterAllTodos,filterCompletedTodos,filterIncompletedTodos} from '../Redux/actions.js'
import { AddTodoAction,RemoveTodoAction,DoTodoAction} from '../Redux/ActionCreator.js';


window.deleteHandler = deleteHandler
window.DoHandler = DoHandler


const AddBTN = document.querySelector('.todo-button');
let input = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list')




const reducers=( state = [] ,action,todo)=>{
    
switch (action.type) {
    case (addTodo):{
        let newState = [...state]
        let newOBJ = {
            id: Math.random()*100 ,
            title:action.title
          , isCompleted:false
        }
        newState.push(newOBJ)
        return newState
       

        }
  
    case (removeTodo):{
       let OldState = [...state]
       let NewState =OldState.filter(state => state.id != action.id)
        return NewState
      }

    case doTodo:{
      let State = [...state]
      let target_Obj = State.findIndex((state)=>{
      return state.id == action.id
      })
      State[target_Obj].isCompleted=!State[target_Obj].isCompleted
      return State
    }
    
    case filterAllTodos:
     
    case filterCompletedTodos:
     
    case filterIncompletedTodos:
     
        

    default:
        break;
}

}

let store = Redux.createStore(reducers)


const getAllTodo = (GetState) =>{
    todoList.innerHTML = ''
    console.log(GetState);
    GetState.forEach((element)=> {
      
       todoList.insertAdjacentHTML(
        'beforeend',
       `<div class="todo ${element.isCompleted ? 'completed': ''}">
        <li class="todo-item">${element.title}</li>
        <button class="complete-btn" onclick=DoHandler('${element.id}')>
          <i class="fas fa-check-circle"></i>
        </button>
        <button class="trash-btn" onclick=deleteHandler('${element.id}')>
          <i class="fas fa-trash"></i>
        </button>
      </div>`
       
       ) 
    });

}


function deleteHandler (id) {
  store.dispatch(RemoveTodoAction(id))
    let GetState = store.getState()
    console.log(GetState);
  getAllTodo(GetState)
  
}

function DoHandler(id){
  store.dispatch(DoTodoAction(id))
  let GetState = store.getState()
  console.log(GetState);
getAllTodo(GetState)
}



AddBTN.addEventListener( 'click',(e)=>{
    e.preventDefault()
    let inputText = input.value.trim()
    store.dispatch(AddTodoAction(inputText))
    let GetState = store.getState()
    getAllTodo(GetState)
})


