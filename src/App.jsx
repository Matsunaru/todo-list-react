import { useState } from "react";
import ToDoList from "./ToDoList";


const App = () => {
  const [istoShown, setIsFormShown] = useState(false);

  return (<ToDoList/>);
};

export default App;
