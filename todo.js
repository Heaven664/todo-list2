document.addEventListener("DOMContentLoaded", () => {

  // Model section

  // Assigns todo-list 'div' element to a variable
  const toDoList = document.getElementById('todo-list');

  //  Assigns add-event-button 'button' element to a variable
  const addEventButton = document.getElementById('add-event-button');

  // Empty todo list
  let todos = [];

  // Retrieves saved todo events from local storage and converts to a list
  let savedTodos = JSON.parse(localStorage.getItem('savedTodos'));

  // If retrieved todo events successfully converted to a list
  if (Array.isArray(savedTodos))
  {
    todos = savedTodos;
  }
  // If something went wrong assigns empty list
  else
  {
    todos = [];
  }

  // Adds new event to todo list
  const AddTodo = (eventDate, eventTitle) => {

    // Generates unique id for every todo event
    const eventID = new Date().getTime().toString();

    // Adds new event to the list
    todos.push({
      title: eventTitle,
      date: eventDate,
      id: eventID
    });
  }

  // Removes specific event from the list
  const removeTodo = (idToDelete) => {
    // Reassigns new list after filtration
    todos = todos.filter( todo => {
      // If id of 'delete' button corresponds to event's id
      if (idToDelete === todo.id)
      {
        return false;
      }
      // If id of 'delete' button doesn't correspond to event's id
      else
      {
        return true;
      }
    })
  }

  // Converts events from todo list to 'string' and saves in local storage
  const saveTodos = () => {
   localStorage.setItem('savedTodos', JSON.stringify(todos));
  };

  // Controller section

  // Creates new todo event when add-event-button is clicked
  addEventButton.onclick  = () => {
    // Gets event title from input
    const eventTitle = document.getElementById('event-title').value;
    // Gets event date from input
    const eventDate = document.getElementById('event-date').value;

    // Adds new event
    AddTodo(eventDate, eventTitle);

    // Saves changes
    saveTodos();

    // Displays changes
    render();
  }

  // Deletes todo element when 'delete; button is clicked
  const deleteTodo = event => {
    // Detects which 'delete' button was clicked and assigns it to a variable
    let deleteButton = event.target;
    // Assigns 'delete' button's id to a variable
    const idToDelete = deleteButton.id;

    // Removes a todo event
    removeTodo(idToDelete);

    // Saves changes
    saveTodos();

    // Displays changes
    render();
  }
  
    // View section

    // Renders content inside todo-list 'div' element
    const render = () => {

      // Resets elements inside todo-list 'div'
      toDoList.innerText = '';
      // Iterates trough every todo event
      todos.forEach( (todo) => {

        // Assigns 'div' element for every event
        const element = document.createElement('div');
        // Displays event title and event test inside every 'div'
        element.innerText = todo.title + " " + todo.date;
        // Assigns 'button' element for every event
        let deleteButton = document.createElement('button');
        // Assigns text inside the button
        deleteButton.innerText = 'Delete';
        // Assigns id for 'delete' button similar to corresponding event id 
        deleteButton.id = todo.id;
        // Calls deleteTodo function when button is clicked
        deleteButton.onclick = deleteTodo;
        // Appends a 'delete' button to event element
        element.appendChild(deleteButton);
        // Appends an event to todo list
        toDoList.appendChild(element);
      });
    }
  
  // Displays content
  render();
})