
import {addTodo,removeTodo,doTodo,filterAllTodos,filterCompletedTodos,filterIncompletedTodos} from '../Redux/actions.js'
import { AddTodoAction,RemoveTodoAction,DoTodoAction} from '../Redux/ActionCreator.js';


window.deleteHandler = deleteHandler
window.DoHandler = DoHandler


const AddBTN = document.querySelector('.todo-button');
let input = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list')
let todoStatus = document.querySelector('.filter-todo')



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
    
    case filterAllTodos:{
      return state
    }
      
    case filterCompletedTodos:
      return state
    case filterIncompletedTodos:
      return state     
        

    default:
        break;
}

}

let store = Redux.createStore(reducers)


const getAllTodo = (todo) =>{
    todoList.innerHTML = ''
    todo.forEach((element)=> {
      
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
    let todo = store.getState()
    
  getAllTodo(todo)
  
}

function DoHandler(id){
  store.dispatch(DoTodoAction(id))
  let todo= store.getState()

getAllTodo(todo)
}




AddBTN.addEventListener( 'click',(e)=>{
    e.preventDefault()
    let inputText = input.value.trim()
    store.dispatch(AddTodoAction(inputText))
    let todo = store.getState()
    getAllTodo(todo)
})


todoStatus.addEventListener('change',(e)=>{
  let getTodos = store.getState()
  switch (e.target.value){
    case 'all':
      getAllTodo(getTodos)
      store.dispatch({ type:filterAllTodos})

      break

    case 'completed':
      
      // store.dispatch({ type:filterCompletedTodos})
      let isCompeletedTodos = getTodos.filter((todo)=>{
          return todo.isCompleted == true
      })
      getAllTodo(isCompeletedTodos)
      break

    case'incomplete':
      // store.dispatch({ type:filterIncompletedTodos})
      let isInCompeletedTodos = getTodos.filter((todo)=>{
          return todo.isCompleted == false
      })
      getAllTodo(isInCompeletedTodos)
      break

    }
})