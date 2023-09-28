var previousValue;
var username;

$(document).ready(function(){

    //Creates an empty task. This task currently only exists in the front-end until edited
    $(".add").click(function(){
        addEmptyTask();
    });

    //Fetch our current tasks from the API
    getTasks();

});

//Created the HTML representation of an empty task
function addEmptyTask(){
    //Write out the html entry element
    var newEntry = "<div class='entry'>";
    newEntry += "<div class='task'><input class='check' type='checkbox'><input class='taskText' type='text' placeholder='Enter task...'></input></div>";
    newEntry += "<div class='delete'><iconify-icon icon='fluent:delete-12-filled'></iconify-icon></div>";
    newEntry += "</div>";

    //Add the element to the list
    $( ".entries" ).append( newEntry );

    //Refresh the various event bindings to make sure the new element is properly bound
    refreshBindings();
}

//Deletes the HTML representation of the task
function deleteTask(entry){
    entry.remove();
}


//Update our JS bindings. Called when a new element is created
function refreshBindings(){

    //Remove existing bindings
    $(".delete").unbind();
    $(".taskText").unbind();
    $(".check").unbind();

    //Bind new events
    $(".delete").click(function(){
        var element = $(this).closest('.entry');
        var id = element.attr("id");

        //If it is an empty new task, it won't have an id yet, so just delete the HTML, otherwise, send an API request
        if(id)
            deleteTaskRequest(id, element);
        else
            deleteTask(element);
    });

    //Whenever we click on a text field (task) it stores the current value to check if it is a new emtpy task and to reset if invalid data (emtpy)
    $(".taskText").focus(function(){
        previousValue = this.value;
    }).change(function(){
        //If we changed an empty task, create the task in the database

        //Dont allow empty tasks
        if(this.value == ""){
            alert("Tasks cannot be empty");
            this.value = previousValue;
            return;
        }

        //Since we don't allow empty tasks, reset to previous tasks if empty
        if(previousValue == ""){
            createTaskRequest(this.value, $(this).closest(".entry"));
        }
        else{ // If we edit the text of a task, request the change in the API
            var entry = $(this).closest(".entry");
            updateTaskRequest(entry.attr("id"), this.value, $(this).siblings(".check").prop("checked"), entry);
        }
        previousValue = this.value;
    });

    //If we check a task as completed, request the change in the API
    $(".check").change(function(){
        var entry = $(this).closest(".entry");
        updateTaskRequest(entry.attr("id"), $(this).siblings(".taskText").value, $(this).prop("checked"), entry);
    });
}


// #region API Call functions

function createTaskRequest(taskText, entry){
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/tasks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({taskText: taskText})
    }).done(function (data, textStatus, jqXHR) {
        var id = data.taskId;
        entry.attr("id",id);
    });
}

function deleteTaskRequest(id, entry){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/tasks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({taskId: id})
    }).done(function (data, textStatus, jqXHR) {
        deleteTask(entry);
    });
}

function updateTaskRequest(id, text, completed, entry){
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/tasks",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({taskId: id, taskText: text, completed: completed})
    }).done(function (data, textStatus, jqXHR) {
    });
}


function getTasks(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/tasks",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data, textStatus, jqXHR) {
        data.tasks.forEach((element) => console.log(element));

        data.tasks.forEach((element) => {
            var checkVal = element.completed ? "checked" : "";

            var newEntry = "<div class='entry' id='"+element.task_id+"'>";
            newEntry += "<div class='task'><input class='check' type='checkbox' "+checkVal+"><input class='taskText' type='text' placeholder='Enter task...' value='"+element.task+"'></input></div>";
            newEntry += "<div class='delete'><iconify-icon icon='fluent:delete-12-filled'></iconify-icon></div>";
            newEntry += "</div>";
    
            //Add the element to the list
            $( ".entries" ).append( newEntry );
        });

        refreshBindings();
    });
}

// #endregion 


