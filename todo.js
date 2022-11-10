document.addEventListener("DOMContentLoaded", () => {

  // Model section

  // Empty todo list
  const todos = [];

  // Assigns todo-list 'div' element to a variable
  const toDoList = document.getElementById('todo-list');

  //  Assigns add-event-button 'button' element to a variable
  const addEventButton = document.getElementById('add-event-button');

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

  // Controller section

  // Creates new todo event when add-event-button is clicked
  addEventButton.onclick = newTodo = () => {
    // Gets event title from input
    const eventTitle = document.getElementById('event-title').value;
    // Gets event date from input
    const eventDate = document.getElementById('event-date').value;

    AddTodo(eventDate, eventTitle);

    render();
  }
  
    // View section

    // Renders content inside todo-list 'div' element
    const render = () => {

      // Resets elements inside todo-list 'div'
      toDoList.innerText = '';
      // Iterates trough every todo event
      todos.forEach( function(todo) {

        // Assigns 'div' element for every event
        const element = document.createElement('div');
        // Displays event title and event test inside every 'div'
        element.innerText = todo.title + " " + todo.date;
        // Appends an event to todo list
        toDoList.appendChild(element);
      });
    }

  render();
})