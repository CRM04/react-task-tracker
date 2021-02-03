import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/Header";
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from "./components/Footer";
import About from "./components/About";

function App() {

  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const getTaks = async () => {
      const tasks = await fetchTasks();
      setTasks(tasks);
    }
    getTaks();
  }, [])

  const fetchTasks = async () => {
    const tasks = await fetch('http://localhost:5000/tasks').then(res => res.json());
    return tasks;
  }

  const fetchTask = async (id) => {
    const tasks = await fetch(`http://localhost:5000/tasks/${id}`).then(res => res.json());
    return tasks;
  }

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error)
    }
  }

  const toggleReminder = async (id) => {
    const task = await fetchTask(id);
    const newTask = { ...task, reminder: !task.reminder };
    try {
      fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(newTask)
      }).then(res => res.json());

      setTasks(tasks.map(task => task.id === id ? { ...task, reminder: !task.reminder } : task));
    } catch (e) {
      console.error(e)
    }
  }

  const onAddTask = async (Task) => {
    /* const id = Math.random(Math.random() * 1000 + 1);
    const newTask = { id, ...Task }; */
    try {
      const newTask = await fetch('http://localhost:5000/tasks',
        {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify(Task)
        }).then(res => res.json());

      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error(error)
    }
  }

  const onShow = () => setShowForm(!showForm);

  return (
    <Router>
      <div className="container">
        <Header title='Task Tracker' onShow={onShow} showForm={showForm} />
        {showForm && <AddTask onAddTask={onAddTask} />}
        <Route path='/' exact render={ (props) => (
          <>
            {
              tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No task to show'
            }
          </>
        )}/>
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
