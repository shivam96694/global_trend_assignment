import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./services/api";
import TaskList from "./components/TaskList";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
const [filter, setFilter] = useState("all");
const filteredTasks = tasks.filter(task => {
  if (filter === "completed") return task.completed;
  if (filter === "pending") return !task.completed;
  return true;
});
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      alert("Error fetching tasks");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async () => {
if (!title.trim()) {
  alert("Enter valid task");
  return;
}    await addTask({ title });
    setTitle("");
    fetchTasks();
  };

  const handleToggle = async (id) => {
    await updateTask(id);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={handleAdd}>Add</button>

      {loading && <p>Loading...</p>}
{filteredTasks.length === 0 && !loading && <p>No tasks yet</p>}
<div style={{ marginTop: 10 }}>
  <button onClick={() => setFilter("all")}>All</button>
  <button onClick={() => setFilter("completed")} style={{ marginLeft: 5 }}>Completed</button>
  <button onClick={() => setFilter("pending")} style={{ marginLeft: 5 }}>Pending</button>
</div>
     <TaskList
  tasks={filteredTasks}
  onToggle={handleToggle}
  onDelete={handleDelete}
/>
        
     
    </div>
  );
}

export default App;