import { useState } from "react";
import { TaskProvider } from "./TaskContext";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import AddTaskModal from "./components/AddTaskModal";
import Navbar from "./components/shared/Navbar";
import ColorReactionGame from "./components/ColorReactionGame";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchText, setSearchText] = useState("");

  return (
    <>
    <ColorReactionGame></ColorReactionGame>
    
    </>
  );
}

export default App;
