
//Function for loading the tasks from Local Storage
function loadTasks (){
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
}
//Update Statistics & Charts
function updateStats (){
    const tasks = loadTasks ();

// Calculated completed and pending tasks
    const completed = tasks.filter (t=> t.status ==='completed').length;
    const pending = tasks.filter (t=>t.status === 'pending').length;

//Update DOM elements with statistics
    document.querySelector ('#totalTasks').textContent = tasks.length;
    document.querySelector('#completedTasks').textContent = completed;
    document.querySelector('#pendingTasks').textContent = pending;
    document.querySelector ('#completionRate').textContent = Math.round ((completed/tasks.length)*100) + '%';

//Create Pie chart for Pending Vs Completed
    new Chart (document.querySelector ('#statusChart').getContext('2d'),{
        type: 'pie',
        data: {
            labels: ['Completed','Pending'],
            datasets: [{
                data :[completed,pending],
                backgroundColor:['#28a745', '#ffc107']
            }]
        },
        options:{
            responsive :true,
            maintainAspectRatio: false
        }
    });

//Calculate tasks by priority
    const high = tasks.filter(t=>t.priority ==='high').length;
    const medium = tasks.filter(t=>t.priority === 'medium').length;
    const low = tasks.filter (t=>t.priority ==='low').length;

//Create Bar Chart for priority
    new Chart (document.querySelector('#priorityChart').getContext('2d'),{
        type:'bar',
        data:{
            labels:['High', 'Medium', 'Low'],
                datasets: [{
                    label:'Tasks',
                    data: [high,medium,low],
                    backgroundColor: ['#dc3545', '#ffc107', '#28a745']
                }]
        },
        options:{
            responsive: true,
            maintainAspectRatio:false ,
            scales: {
                y : {beginAtZero: true}
            }
        }
    });
}
//Initialize the statistics
updateStats();
