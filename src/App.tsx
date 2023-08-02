
import { Route, Routes } from 'react-router-dom';
import Register from "./components/Register.tsx";
import ListTasks from './components/ListTasks.tsx';
import Login from './components/Login.tsx';
import CreateTask from './components/CreateTask.tsx';
import UpdateTask from './components/UpdateTask.tsx';


const App = () => {

  return (

    <div>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/listTask" Component={ListTasks} />
        <Route path="/createTask" Component={CreateTask} />
        <Route path="/UpdateTask/:taskId" Component={UpdateTask} />
        <Route path="/" Component={Login} />
      </Routes>
    </div>
  );
};

export default App
