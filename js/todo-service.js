'use strict';

var gNextId = 101;
var gTodos = createTodos();
var gFilterBy = 'All';
var gSortBy = 'Time added';

function createTodos() {
    return [
        createTodo('Do that', 1),
        createTodo('Do this', 1),
        createTodo('Sleep now', 1),
    ]
}
function createTodo(txt, priorityNum) {
    return {
        id: gNextId++,
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance: +priorityNum
    }
}

function removeTodo(todoId) {
    var todoIdx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(todoIdx, 1);
}

function getTodosToShow() {
    if (gFilterBy === 'All') return gTodos;
    var todosToShow = gTodos.filter(function (todo, idx) {
        return (gFilterBy === 'Done' && todo.isDone) ||
                (gFilterBy === 'Active' && !todo.isDone)
    })
    return todosToShow;
}

function getTodosToSort(){
    var todosToSort;
    if(gSortBy === 'Alphabetical order'){
        todosToSort = gTodos.sort(function(a, b){return (a.txt < b.txt)? -1: 1});
    }
    if(gSortBy === 'Priority'){
        todosToSort = gTodos.sort(function(a, b){return a.importance - b.importance})
    }
    if(gSortBy === 'Time added'){
        todosToSort = gTodos.sort(function(a, b){return a.createdAt - b.createdAt})
    }
    return todosToSort
}

function getTotalCount() {
    return gTodos.length;
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    // if (!todo) return;
    todo.isDone = !todo.isDone;
}

function addTodo(txt, priorityNum) {
    setPriority(priorityNum);
    gTodos.push(createTodo(txt, priorityNum));
    //pushes new todo to the model
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy){
    gSortBy = sortBy;
}

function setPriority(priorityNum){
    +priorityNum;
}

function getActiveCount() {
    var activeTodos = gTodos.filter(function(todo){
        return !todo.isDone
    })
    return activeTodos.length
}

function getDoneCount(){
    var doneTodos = gTodos.filter(function(todo){
        return todo.isDone
    })
    return doneTodos.length
}

