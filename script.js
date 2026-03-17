// Counter functionality
let counter = 0;
const counterDisplay = document.getElementById('counter');
const incrementBtn = document.getElementById('increment');
const decrementBtn = document.getElementById('decrement');
const resetBtn = document.getElementById('reset');

// Color changer functionality
const colorButtons = document.querySelectorAll('.color-btn');

// Todo list functionality
const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoItems = document.getElementById('todo-items');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple Web App initialized!');
    
    // Counter event listeners
    incrementBtn.addEventListener('click', incrementCounter);
    decrementBtn.addEventListener('click', decrementCounter);
    resetBtn.addEventListener('click', resetCounter);
    
    // Color changer event listeners
    colorButtons.forEach(button => {
        button.addEventListener('click', changeBackgroundColor);
    });
    
    // Todo list event listeners
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Load saved todos from localStorage
    loadTodos();
});

// Counter functions
function incrementCounter() {
    counter++;
    updateCounterDisplay();
    animateCounter();
}

function decrementCounter() {
    counter--;
    updateCounterDisplay();
    animateCounter();
}

function resetCounter() {
    counter = 0;
    updateCounterDisplay();
    animateCounter();
}

function updateCounterDisplay() {
    counterDisplay.textContent = counter;
    
    // Add color based on value
    if (counter > 0) {
        counterDisplay.style.color = '#4CAF50';
    } else if (counter < 0) {
        counterDisplay.style.color = '#f44336';
    } else {
        counterDisplay.style.color = '#667eea';
    }
}

function animateCounter() {
    counterDisplay.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counterDisplay.style.transform = 'scale(1)';
    }, 200);
}

// Color changer functions
function changeBackgroundColor(e) {
    const color = e.target.getAttribute('data-color');
    document.body.style.background = color;
    
    // Add ripple effect
    createRipple(e.target);
}

function createRipple(button) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.background = 'rgba(255,255,255,0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Todo list functions
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const todoItem = createTodoElement(todoText);
    todoItems.appendChild(todoItem);
    
    // Clear input
    todoInput.value = '';
    
    // Save to localStorage
    saveTodos();
    
    // Focus back to input
    todoInput.focus();
}

function createTodoElement(text) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    const todoText = document.createElement('span');
    todoText.textContent = text;
    todoText.addEventListener('click', function() {
        li.classList.toggle('completed');
        saveTodos();
    });
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        li.remove();
        saveTodos();
    });
    
    li.appendChild(todoText);
    li.appendChild(deleteBtn);
    
    return li;
}

function sayhelloswastik() {
    console.log('Hello Swastik!');
}

function saveTodos() {
    const todos = [];
    const todoElements = todoItems.querySelectorAll('.todo-item');
    
    todoElements.forEach(item => {
        const text = item.querySelector('span').textContent;
        const completed = item.classList.contains('completed');
        todos.push({ text, completed });
    });
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    
    if (savedTodos) {
        const todos = JSON.parse(savedTodos);
        todos.forEach(todo => {
            const todoItem = createTodoElement(todo.text);
            if (todo.completed) {
                todoItem.classList.add('completed');
            }
            todoItems.appendChild(todoItem);
        });
    }
}

// Add some CSS for the ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🎉 Welcome to Simple Web App!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cFeatures:', 'color: #333; font-size: 14px; font-weight: bold;');
console.log('%c• Interactive counter', 'color: #4CAF50;');
console.log('%c• Background color changer', 'color: #45B7D1;');
console.log('%c• Todo list with localStorage', 'color: #96CEB4;');

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'r':
                e.preventDefault();
                resetCounter();
                break;
            case '+':
            case '=':
                e.preventDefault();
                incrementCounter();
                break;
            case '-':
                e.preventDefault();
                decrementCounter();
                break;
        }
    }
});
