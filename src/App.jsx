import React from "react";
import Hero from "./components/Hero";
import AllTasks from "./components/AllTasks";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <ToastContainer />

      <Hero />
      <AllTasks />
    </div>
  );
};

export default App;
