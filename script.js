document.addEventListener("DOMContentLoaded", function() {
    var resultsList = document.getElementById("results");
  
    // Function to fetch and display tasks
    function fetchAndDisplayTasks() {
      // Fetch the data from the server
      fetch("/api/tasks")
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Clear the existing results
          resultsList.innerHTML = "";
  
          // Iterate through the data and create list items
          data.forEach(function(result) {
            var listItem = document.createElement("li");
            listItem.textContent = result.task + " - Priority: " + result.priority;
            resultsList.appendChild(listItem);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  
    // Fetch and display tasks on page load
    fetchAndDisplayTasks();
  
    // Handle form submission
    var postForm = document.getElementById("postForm");
    postForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      var taskInput = document.querySelector("input[name='task']");
      var priorityInput = document.querySelector("input[name='priority']");
      var task = taskInput.value;
      var priority = priorityInput.value;
  
      // Make sure priority is a number between 1 and 9
      priority = Math.max(1, Math.min(9, parseInt(priority)));
  
      // Make a POST request to the server
      fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: task, priority: priority })
      })
        .then(function(response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then(function(data) {
          // Add the new task to the results list
          var listItem = document.createElement("li");
          listItem.textContent = data.task + " - Priority: " + data.priority;
          resultsList.appendChild(listItem);
  
          // Clear the input fields
          taskInput.value = "";
          priorityInput.value = "";
  
          // Fetch and display tasks to update the list
          fetchAndDisplayTasks();
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  });
  