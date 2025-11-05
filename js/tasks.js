//Global variables to store tasks and edit modal
let tasks = [];
let editModal;
let currentPage = 1;
const itemsPerPage = 5;

document.addEventListener('DOMContentLoaded', function() {
    loadTasks();//Load tasks from local storage
    updateStats();
    renderTasks();
    editModal = new bootstrap.Modal(document.querySelector('#editTaskModal'));//Bootstrap modal for task editing

    //Minimum date for due date to today
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('#taskDueDate').min = today;
    document.querySelector('#editTaskDueDate').min = today;
});

document.querySelector('#taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    //Creates new task
    const newTask = {
        id: Date.now(),
        name: document.querySelector('#taskName').value,
        description: document.querySelector('#taskDescription').value,
        dueDate: document.querySelector('#taskDueDate').value,
        priority: document.querySelector('#taskPriority').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);//Add new task
    saveTasks();//Saves the tasks locally
    saveActivity('added', newTask.name);
    updateStats();
    currentPage = 1; // Reset to first page
    renderTasks();
    this.reset();//Clear the fields
});

function renderTasks() {
    const tasksList = document.querySelector('#tasksList');
    const priorityText = { high: 'High', medium: 'Medium', low: 'Low' };

    // Calculate which tasks to show
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const toShow = tasks.slice(start, end);

    //Generates HTML for each task and update the list
    tasksList.innerHTML = toShow.map(t => `
        <div class="task-item ${t.status === 'completed' ? 'completed' : ''}">
            <div class="task-title">${t.name}</div>
            <div class="task-description">${t.description || 'No description'}</div>
            <div class="task-meta">
                <span><i class="bi bi-calendar3"></i> ${new Date(t.dueDate).toLocaleDateString('el-GR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span class="priority-${t.priority}"><i class="bi bi-flag-fill"></i> ${priorityText[t.priority]}</span>
                <span><i class="bi ${t.status === 'completed' ? 'bi-check-circle-fill text-success' : 'bi-clock-history text-warning'}"></i> ${t.status === 'completed' ? 'Completed' : 'Pending'}</span>
            </div>
            <div class="task-actions">
                <button class="btn btn-${t.status === 'pending' ? 'success' : 'warning'} btn-sm" onclick="toggleTaskStatus(${t.id})">
                    <i class="bi bi-${t.status === 'pending' ? 'check-lg' : 'arrow-counterclockwise'}"></i> ${t.status === 'pending' ? 'Completed' : 'Pending'}
                </button>
                <button class="btn btn-primary btn-sm" onclick="editTask(${t.id})"><i class="bi bi-pencil"></i> Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${t.id})"><i class="bi bi-trash"></i> Cancel</button>
            </div>
        </div>
    `).join('');

    // Pagination buttons
    showPagination(tasks.length);
}

function showPagination(total) {
    let paginationDiv = document.querySelector('#tasksPaginationControls');
    if (!paginationDiv) {
        paginationDiv = document.createElement('div');
        paginationDiv.id = 'tasksPaginationControls';
        document.querySelector('#tasksList').after(paginationDiv);
    }

    const totalPages = Math.ceil(total / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationDiv.innerHTML = '';
        return;
    }

    paginationDiv.innerHTML = `
        <div class="pagination-buttons">
            <button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
                <i class="bi bi-chevron-left"></i> Previous
            </button>
            <span class="page-info">Σελίδα ${currentPage} από ${totalPages}</span>
            <button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
                Next <i class="bi bi-chevron-right"></i>
            </button>
        </div>
    `;
}

function changePage(page) {
    currentPage = page;
    renderTasks();
}

//Toggle tasks status pending & completed
function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    saveTasks();
    if (task.status === 'completed') {
        saveActivity('completed', task.name);
    }
    updateStats();
    renderTasks();
}

//Open modal with task data
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    document.querySelector('#editTaskId').value = task.id;
    document.querySelector('#editTaskName').value = task.name;
    document.querySelector('#editTaskDescription').value = task.description;
    document.querySelector('#editTaskDueDate').value = task.dueDate;
    document.querySelector('#editTaskPriority').value = task.priority;
    editModal.show();
}

//Saves edited task data
function saveEditTask() {
    const task = tasks.find(t => t.id === parseInt(document.querySelector('#editTaskId').value));
    task.name = document.querySelector('#editTaskName').value;
    task.description = document.querySelector('#editTaskDescription').value;
    task.dueDate = document.querySelector('#editTaskDueDate').value;
    task.priority = document.querySelector('#editTaskPriority').value;
    saveTasks();
    saveActivity('edited', task.name);
    updateStats();
    renderTasks();
    editModal.hide();
}

//Deleted a task
function deleteTask(id) {
    const task = tasks.find(t => t.id === id);
    saveActivity('deleted', task.name);
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    updateStats();
    renderTasks();
}

//Apply filters for sorting tasks
function applyFilters() {
    const statusFilter = document.querySelector('#filterStatus').value;
    const priorityFilter = document.querySelector('#filterPriority').value;
    const sortBy = document.querySelector('#sortBy').value;
    let filtered = [...tasks];
    if (statusFilter !== 'all') filtered = filtered.filter(t => t.status === statusFilter);
    if (priorityFilter !== 'all') filtered = filtered.filter(t => t.priority === priorityFilter);
    if (sortBy === 'dueDate') filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'priority') filtered.sort((a, b) => ({ high: 1, medium: 2, low: 3 }[a.priority] - { high: 1, medium: 2, low: 3 }[b.priority]));
    const original = [...tasks];
    tasks = filtered;
    currentPage = 1; // Reset to first page when filtering
    renderTasks();
    tasks = original;
}

//Update task statistics
function updateStats() {
    document.querySelector('#totalTasks').textContent = tasks.length;
    document.querySelector('#pendingTasks').textContent = tasks.filter(t => t.status === 'pending').length;
    document.querySelector('#completedTasks').textContent = tasks.filter(t => t.status === 'completed').length;
}

//Saves a task locally
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Loads a task from local storage
function loadTasks() {
    const stored = localStorage.getItem('tasks');
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

function saveActivity(type, taskName) {
    let activities = JSON.parse(localStorage.getItem('activities') || '[]');
    activities.push({
        type: type,
        taskName: taskName,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('activities', JSON.stringify(activities));
}

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${msg}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
