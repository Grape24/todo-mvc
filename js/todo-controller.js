'use strict';

function init() {
    renderTodos();
}

function renderTodos() {
    debugger
    var elTodoList = document.querySelector('.todo-list');
    var todos = getTodosToSort();
    todos = getTodosToShow();
    if(todos.length === 0){
        if(gFilterBy === 'All'){
            elTodoList.innerText = `No Todos To Show`;
            renderStats();
            return
        }
        elTodoList.innerText = `No ${gFilterBy} Todos To Show`;
        renderStats();
        return
    }
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone)? 'done' : '';
        return `<li onclick="onToggleTodo(this, ${todo.id})" class="${className}">
                    ${todo.txt}
                    <button onclick="confirmDelete(event, ${todo.id})">x</button>
                </li>`
    })

    elTodoList.innerHTML = strHTMLs.join('');
    renderStats();

}



function renderStats() {
    var totalCount = getTotalCount();
    var activeCount = getActiveCount();
    document.querySelector('.total-count').innerText = totalCount;
    document.querySelector('.active-count').innerText = activeCount;
}

function confirmDelete(ev, todoId){
    var isConfirmed = confirm('Are you sure you want to delete?')
    if (isConfirmed){
        onRemoveTodo(ev, todoId);
    }
}
function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    removeTodo(todoId)
    renderTodos();

}


function onToggleTodo(elTodo, todoId) {
    toggleTodo(todoId)
    elTodo.classList.toggle('done');
    renderStats();
}

function onAddTodo() {
    var elSpan = document.querySelector('.validation');
    //gets the span 
    var elTxt = document.querySelector('input');
    //gets the text from the value of input
    var elPriority = document.querySelector('div.priority-container select');
    //gets the number from the selected option
    var txt = elTxt.value
    //stores it in a variable
    if(txt === ''){
        elSpan.innerText = 'You cannot press add without writing a todo';
        return;
    } 
    var priorityNum = elPriority.value;
    //stores the value in a variable
    console.log('Adding', txt);
    elTxt.value = '';
    //clears the input
    setPriority(priorityNum);
    //sets the priority of the selected value
    addTodo(txt, priorityNum);
    //sends to addTodo the input of the user and adds it to the model
    renderTodos(gTodos)
    //renders the new todo to the DOM

}

function onSetFilter(filterBy) {
    console.log('Setting Filter', filterBy);
    setFilter(filterBy)
    debugger
    //adds to the model the status
    renderTodos();
}

function onSetSort(sortBy){
    console.log('Sorting By', sortBy);
    setSort(sortBy)
    renderTodos();

}



