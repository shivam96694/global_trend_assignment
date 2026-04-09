import { useEffect, useState } from "react";
import { getTasks, addTask, updateTask, deleteTask } from "./services/api";
import TaskList from "./components/TaskList";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!title) return alert("Enter task title");
    await addTask({ title });
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

     <TaskList
  tasks={tasks}
  onToggle={handleToggle}
  onDelete={handleDelete}
/>
        
     
    </div>
  );
}

export default App;