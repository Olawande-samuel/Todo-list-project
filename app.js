// QUERY ELEMENTS
const button = document.querySelector('.btn');
const todoEntry = document.querySelector('.todo-entry');
const todoList = document.querySelector('.todo-list');
const filterList = document.querySelector('.filter-list');
const itemsLeft = document.querySelector('.remainder');
const clearDoneTasks = document.querySelector('.last-item');
const themeToggle = document.querySelector('.theme-toggle');
const container = document.querySelector('.container');
const footList  = document.querySelector('.foot-list');
const todo  = document.querySelector('.todo');
const windowWidth = window.innerWidth;
const body = document.querySelector('body');
const all = document.querySelector('.all');
const active = document.querySelector('.active');
const completed = document.querySelector('.completed');

//ADD EVENTS
button.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteList);
filterList.addEventListener('click', filterTodo)
clearDoneTasks.addEventListener('click', clearCompleted);
themeToggle.addEventListener('click', changeThemes);


//ADD TODO TO ul ELEMENT
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault(); 

    if (todoEntry.value == "") {
        alert("Please enter a task")
    } else {
        
        // CREATE MAIN CONTAINER
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        // CREATE LIST ELEMENT
        const individualTodo = document.createElement('li');
        individualTodo.innerHTML = todoEntry.value;
        individualTodo.classList.add('individual-todo');

        //CREATE CHECK BUTTON
        const checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<img src="./images/icon-check.svg" alt="check button">';
        checkBtn.classList.add('check-btn');
        
        //CREATE DELETE BUTTON
        const deletebtn = document.createElement('button');
        deletebtn.innerHTML = '<img src="./images/icon-cross.svg" alt="delete button">'
        deletebtn.classList.add('delete-btn');

        
        //APPEND ALL CREATED ELEMENTS TO THEIR MAIN CONTAINER
        todoDiv.appendChild(checkBtn);
        todoDiv.appendChild(individualTodo);
        todoDiv.appendChild(deletebtn);
        todoList.appendChild(todoDiv)
        
        //CLEAR INPUT AFTER SUBMITTING
        todoEntry.value = "";
        
        updateTotal();

    } 
}

// CHECK/DELETE TODO
function deleteList(e) {
  //REMOVE TODO ON CLICK
    const item = e.target;
    if (item.classList[0] === "delete-btn") {
        item.parentElement.remove();
    }
    
    //ADD complete CLASS ON CHECK
    if(item.classList[0] === "check-btn") {
        const checked = item.parentElement;
        checked.classList.toggle("complete")
    }

    updateTotal();
}

// FILTER TODO
function filterTodo(e) {
  const todos = todoList.childNodes;
  
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        e.target.classList.add('highlight')
        break;
      case "completed":
        if (todo.classList.contains("complete")) {
          todo.style.display = "flex";

        } else {
          todo.style.display = "none";
        }
        break;
      case "active":
        if (!todo.classList.contains("complete")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
  
  // APPLY highlight CLASS TO FILTER LIST
  switch (e.target.value) {
    case "all":
      all.classList.add('highlight');
      active.classList.remove('highlight');
      completed.classList.remove('highlight');
      break;
  
    case "active":
      all.classList.remove('highlight');
      active.classList.add('highlight');
      completed.classList.remove('highlight');
      break;

    case "completed":
      all.classList.remove('highlight');
      active.classList.remove('highlight');
      completed.classList.add('highlight');
      break;
  }
 
}

//CLEAR COMPLETED TODO FROM LIST
function clearCompleted() {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        if (todo.classList.contains("complete")) {
            todo.remove();
        } 
    })
    
    updateTotal()

}

// SHOW NUMBER OF UNCOMPLETED TODOS
function updateTotal() { 
    const todos = todoList.childNodes;
    const activeList = [];
    todos.forEach(function (todo) { 
      if (!todo.classList.contains('complete')) {
        const activeTodos = !todo.classList.contains('complete');
        activeList.push(activeTodos);
      }

      const total = activeList.length
      itemsLeft.innerText = total ;
    })

}

//CHANGE THEME
function changeThemes(){
    // change header image
    const headerImg = document.querySelector('.header-img');
    const darkThemeImage = "https://github.com/Olawande-samuel/Todo-list-project/blob/master/images/bg-desktop-dark.jpg?raw=true";
    const lightThemeImage = "https://github.com/Olawande-samuel/Todo-list-project/blob/master/images/bg-desktop-light.jpg?raw=true";
    headerImg.src = (headerImg.src === darkThemeImage)? lightThemeImage : darkThemeImage;
    
    // toggle switch icon
    const themeimg = document.querySelector('#themeImage');
    const moon = "https://raw.githubusercontent.com/Olawande-samuel/Todo-list-project/a3fb87b7204b481ef48ff27a963ee263768bedfd/images/icon-moon.svg";
    const sun = "https://raw.githubusercontent.com/Olawande-samuel/Todo-list-project/a3fb87b7204b481ef48ff27a963ee263768bedfd/images/icon-sun.svg";
    themeimg.src = (themeimg.src === sun)? moon : sun;

    // add light-theme class to HTML body
    body.classList.toggle('light-theme');   

    changeImageOnResize()
}

// DETERMINE HEADER IMAGE BY SCREEN SIZE

function changeImageOnResize() {
    
    const headerImg = document.querySelector('.header-img');
    const mobileLightImage = "https://github.com/Olawande-samuel/Todo-list-project/blob/master/images/bg-mobile-light.jpg?raw=true";
    const mobileDarkImage = "https://github.com/Olawande-samuel/Todo-list-project/blob/master/images/bg-mobile-dark.jpg?raw=true";
    const bgdDarkImage = "https://github.com/Olawande-samuel/Todo-list-project/blob/master/images/bg-desktop-dark.jpg?raw=true";
    const bgdLightImage = "https://github.com/Olawande-samuel/Todo-list-project/blob/master/images/bg-desktop-light.jpg?raw=true";
    

    if(windowWidth < 375 && body.classList.contains('light-theme')) {
        headerImg.src = mobileLightImage;
    }else if(windowWidth < 375 && !body.classList.contains('light-theme')) {
        headerImg.src = mobileDarkImage;
    }

}

window.addEventListener('resize', changeImageOnResize)
