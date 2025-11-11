//Executes loadActivity after DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadActivity);

let currentPage = 1;
const itemsPerPage = 5;

//Load tasks from local storage
function loadActivity() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');

    //Update statistics
    document.querySelector('#miniTotal').textContent = tasks.length;
    document.querySelector('#miniPending').textContent = tasks.filter(t => t.status === 'pending').length;
    document.querySelector('#miniCompleted').textContent = tasks.filter(t => t.status === 'completed').length;
    
    renderActivity(activities);
}

function renderActivity(activities) {
    //Refers to the activity list
    const list = document.querySelector('#activityList');
    const icons = {
        added: 'bi-plus-circle-fill',
        completed: 'bi-check-circle-fill',
        deleted: 'bi-trash-fill',
        edited: 'bi-pencil-fill'
    };

    //Display titles for different activities
    const titles = {
        added: 'Added',
        completed: 'Completed',
        deleted: 'Deleted',
        edited: 'Edited'
    };

    // Reverse order (newest first)
    const reversed = [...activities].reverse();
    
    // Calculate which activities to show
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const toShow = reversed.slice(start, end);

    // Display activities
    list.innerHTML = toShow.map(a => `
        <div class="activity-item">
            <span class="activity-icon ${a.type}"><i class="bi ${icons[a.type]}"></i></span>
            <b>${titles[a.type]}:</b> ${a.taskName}
            <br><small class="text-muted"><i class="bi bi-clock"></i>
            ${new Date(a.timestamp).toLocaleString('el-GR')}</small>
        </div>
    `).join('');

    // Pagination buttons
    showPagination(reversed.length);
}

function showPagination(total) {
    let paginationDiv = document.querySelector('#paginationControls');
    if (!paginationDiv) {
        paginationDiv = document.createElement('div');
        paginationDiv.id = 'paginationControls';
        document.querySelector('#activityList').after(paginationDiv);
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
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    renderActivity(activities);
}
