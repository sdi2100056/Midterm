Introduction:
The app refers to the professional football players of Panathinaikos and how they organize their everyday life. The app allows them to visualize their daily tasks related to their job and obligations. Furthermore, they are assigned specific tasks are required to fulfill. These tasks may include weight training, fitness training, football practice, physiotherapy sessions and coach pep talks.  In addition to these activities there may also be team meetings and other responsibilities that are part of a footballer’s routine.

GitHub Link : https://github.com/sdi2100056/Midterm.
NOTE: Open project with Visual Studio Browser.
ReadMe file is implemented as the third component within the statistics page.
MetaTags: 
Task Allocation System:
The task allocation system is very simple and easy to use. A task or goal is set by the footballer or a staff member and the task is activated. The predefined fields for creating a task are:
1.	Task name
2.	Expiration date
3.	Priority
4.	Description
Every field has its own importance so that the footballer can have a clear overview  of the task. The expiration date field uses a calendar to make date selection easier. The priority  filed highly important because depending on the selected level it displays an icon in a different color allowing users to recognize urgency at a glance.
Finally there is the field where the person who created the task can provide details and explain the reason behind the chosen priority. There are also some filters that are very useful for helping users search for a specific task. The search can be conducted based on the task’s status (completed or not), it’s priority or alphabetically by name - always starting from higher priority. 
After a task is successfully uploaded it appears as follows :

 
In the header there is the title followed by the description. The comes the expiration date and the priority (medium priority is always by a flag icon inside a yellow container). After that the task status is displayed and if the task is completed it appears as follows:
 
There is also the option to edit a task if any changes need to be made.
At the top of the page there is a tracker that monitors tasks progress and displays the number of completed, pending and total tasks.
 

After a task is added whether completed or not, the data automatically sent to the analytics page. Charts are generated showing completed and pending tasks (calculating percentages and displaying a pie chart) as well as the number of tasks by priority (a bar chart for each category)
 

Also as we can see there is a percentage that represents the task completion.
Coding Decisions:
Tasks.html/js/css : Uses the typical structure of HTML5 (<!DOCTYPE html> και <html lang="el">) in order toto ensure language compatibility and correct recognition. In the code there are meta tags to set character encoding, a short description for the browser, automatic refresh and other purposes. I have implemented bootstrap icons through a link and connected all the necessary CSS, JavaScript and HTML files to the HTML page. 
The body contains a navigation placeholder which is the place that the navigation bar will be added, the form to add tasks and the placeholder for the footer which is where the footer will be located. Also, a modal for task editing better used on the same page. All the code is implemented inside of Bootstrap to have better styling. 
Ιn the JavaScript file there is an array  called tasks[ ] to load all the tasks and keep a record of them.

 
After the page is fully loaded with the necessary scripts of the photo then all the loaded tasks on the local storage are reloaded. It updates the statistics and very importantly sets the minimum date to day. 
 

To create a new task the above functionality is used. Function e.preventDefault() prevents the immediate submit. The browser does not refresh and the page stays as it is and the tasks is immediately added. The data and time of creation are stored in createdAt. The default status for every task is “Pending” and the user can choose one of the other three. The function this.reset() resets and cleans the form.


This piece of code is reliable for pagination. The way it operates is very simple: if the current page is 1, it determines the start index as start=0 and the end index as end=5. The tasks that will be shown are from 0 to 4. Similarly for page 2 the start index  is determined as 5 and the end index as 10. If there is only one page, then the pagination numbers are not shown. The function Math.ceil() round the number up (if we have 7 tasks then we are going to need 2 pages). The buttons also get disabled when the user is on the first or last page. The unique ID that a task has plays a very crucial role in editing that task which ensures us that the right changes are going to be applied to the right task.


 
The function tooogeTaskStatus(id) after finding a task with its unique ID can change the status from “Pending” to “Completed”. To quickly and easily find the task it uses the method find() by using the ID.
 For the toggle a conditional operator is used for the status change and finally it calls the function save to save the change it in the memory. After that there are functions for editing and saving the edited task. The editTask function handles the tasks based on the ID in order to ensure that the data are correctly loaded. In addition, the Bootstrap method editModal.show() is used to display the modal (the form for editing) to the user. This is followed by the saveEditTask() function which collects all the updated data from the fields of the form and updates the correct object in the array of tasks. It uses the hidden field #editTaskId (hidden because the user must not see such information). With parseInt() the number given to this field form the DOM is converted to an integer number in order to be matched to the correct ID.

 
These two functions are used to save and load the tasks array from local storage. The JSON.stringfy() method is used for saving and JSON.parse() for loading because local storage can store only string types. JSON method are of crucial importance for the preservation of data in local storage. The main reason JSON was chosen for use is that local storage can save only string types and not arrays or objects within arrays. The procedure JSON.stringfy() converts an object or JavaScript array into a JSON string type
The procedure JSON.parse() does the exact opposite as it converts the JSON string back to the object or array as it was. 

 
Finally the function saveActivity() records an user’s action on the activity recording file. Very important is the timestamp with which the task name is saved, the procedure Date().toISOString done this exactly. The functionality of this procedure is very simple: when the command new Date() is executed, then JavaScript creates and object that contains the date/time. IOSString is the most crucial part because it converts the date to a string which complies with an international standard (ISO). 

Recent Activity: The recent Activity section is on the index page, and shows the user the last activity. It contains tasks that have been Completed, Pending, or Deleted. The date and time are also shown.
A function of high importance is this command DOMContentLoaded Listener which ensures that the loadActivity function executes instantly after the page fully loads the DOM before using HTML objects.
The loadActivity function:
 
The function loads tasks and activities from the localStorage and calculates the counters miniTotal,miniPending and miniCompleted in order to show the correct number. JSON.parse() is used to convert the saved strings into functional arrays.  After this is completed then with the method filter() it counts the tasks for each category and the counters are updated.





The renderActivity(activities) function:
 

The function creates an HTML list for recent activities. More specifically this function maps objects for UI. These objects are: icons, titles which are used to match the type of task(a.type) to the correct Bootstrap icon and correct text.  To be displayed starting from the more recent the methodology used is similar with LIFO. This is achieved with [activities].reverse().

The page I decided to create is “Statistics” which shows players’ statistics and the upcoming matches. Also the third component is the ReadMe file which automatically downloads by clicking a button. The structure is HTML5 and by using the meta charset=UTF-8 it is ensured that the characters will be correctly recognized. For the table of the footballers’ statistics I emphasize the green color and the command table-striped enhances the readability of long strings. The command table-responsive ensures the correct view for mobile devices. Upcoming fixtures are organized using div.row and this helps us to correctly view the components in bigger screens. For every match a single card is used and has different styling based on the match that it represents. Finally there is a link for downloading of ReadMe document.

Analytics.js: 

 
	
It gets as entrance the value saved in local storage using as key the object tasks an it assigns to the variable stored. Basically it recovers the saved tasks/values as string. After that it checks if a value is saved on variable stored, if it has then with json converts it to an object of javascript. In the case of no finding anything stored it retrns an empty array.

 

Finds the html object with ID= totalTasks and implements the total tasks number. Its calculates the completion rate as percentage and round the result in the nearest number
