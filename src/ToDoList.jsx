import React, { useState, useEffect } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [Theme, setTheme] = useState(false); // false = light, true = dark

  // 🔁 Load data from localStorage when component mounts
  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      const parsedTheme = savedTheme === "true"; // Convert string to boolean
      setTheme(parsedTheme);

      // Apply background and text colors based on the theme
      document.body.style.backgroundColor = parsedTheme ? "#333333" : "#ffffff";
      document.body.style.color = parsedTheme ? "#ffffff" : "#000000";
    }
  }, []);

  // 💾 Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 💾 Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", Theme);
  }, [Theme]);

  // Handle input change for new task
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  // Add a new task to the list
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask(""); // Clear input field
    }
  }

  // Remove a task by index
  function removeTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  // Move task up by one position
  function moveTaskUP(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      // Swap the current task with the one above it
      [updatedTasks[index], updatedTasks[index - 1]] =
        [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  // Move task down by one position
  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      // Swap the current task with the one below it
      [updatedTasks[index], updatedTasks[index + 1]] =
        [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  // Toggle between light and dark theme
  function ThemeChange() {
    const newTheme = !Theme;
    setTheme(newTheme);

    // Change colors of the page based on the theme
    document.body.style.backgroundColor = newTheme ? "#333333" : "#ffffff";
    document.body.style.color = newTheme ? "#ffffff" : "#000000";
  }

  return (
    <div className="to-do-list">
      {/* Theme toggle icon */}
      <div className="Theme" onClick={ThemeChange}>
        {Theme ? "🌞" : "🌙"}
      </div>

      <h1>To-Do-List</h1>
      <h1>You have {tasks.length} tasks</h1>

      <div>
        {/* Input field for new task */}
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
        />
        {/* Button to add task */}
        <button className="add-button" onClick={addTask}>Add</button>
      </div>

      <ol>
        {/* Display all tasks */}
        {tasks.map((task, index) => (
          <li key={index}>
            <span className="text">{task}</span>
            {/* Remove task */}
            <button className="remove-button" onClick={() => removeTask(index)}>X</button>
            {/* Move task up */}
            <button className="move-button" onClick={() => moveTaskUP(index)} disabled={index === 0}>UP</button>
            {/* Move task down */}
            <button className="move-button" onClick={() => moveTaskDown(index)} disabled={index === tasks.length - 1}>DOWN</button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
