const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.completed));
};

taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text !== '') {
    addTask(text);
    saveTasks();
  }
  taskInput.value = '';
});

function addTask(text, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const actions = document.createElement('div');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏';
  editBtn.addEventListener('click', () => {
    const newText = prompt('Edit task:', span.textContent);
    if (newText !== null) {
      span.textContent = newText;
      saveTasks();
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}