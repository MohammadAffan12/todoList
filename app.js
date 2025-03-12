// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Grab elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const emptyState = document.getElementById('emptyState');
  
    // Load tasks from localStorage or start with an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Render the tasks on the UI
    function renderTasks() {
      // Clear previous list
      taskList.innerHTML = '';
  
      // Loop through tasks and add them to the list
      tasks.forEach((task, index) => {
        // Create list item
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center border-b pb-2 text-gray-800';
  
        // Task text
        const span = document.createElement('span');
        span.textContent = task;
        span.className = 'flex-1';
  
        // Buttons container
        const buttons = document.createElement('div');
        buttons.className = 'space-x-2';
  
        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.className = 'bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
          const newTask = prompt('Edit task:', task);
          if (newTask !== null && newTask.trim() !== '') {
            tasks[index] = newTask.trim();
            saveTasks();
            renderTasks();
          }
        };
  
        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
          tasks.splice(index, 1); // Remove from array
          saveTasks(); // Save to localStorage
          renderTasks(); // Refresh UI
        };
  
        // Append buttons and task to list item
        buttons.appendChild(editBtn);
        buttons.appendChild(deleteBtn);
        li.appendChild(span);
        li.appendChild(buttons);
  
        // Add the list item to the UL
        taskList.appendChild(li);
      });
  
      // Show or hide empty state
      emptyState.classList.toggle('hidden', tasks.length > 0);
    }
  
    // Add task handler
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        tasks.push(taskText);      // Add to array
        saveTasks();               // Save to localStorage
        taskInput.value = '';      // Clear input
        renderTasks();             // Update UI
      }
    });
  
    // Handle Enter key press for adding task
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskBtn.click();
      }
    });
  
    // Initial render when page loads
    renderTasks();
  });
  