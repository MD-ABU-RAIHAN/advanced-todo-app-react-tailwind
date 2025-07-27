import React, { useEffect, useState } from "react";
import NewTask from "./NewTask";

import Task from "./Task";
import Spinner from "./Spinner";
import { getApiData, postApiData } from "../services/api";

const AllTasks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allTasks, setAllTasks] = useState([]);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [newTask, setNewTask] = useState({});

  // HelperFN Fetch all tasks from the API when the component mounts
  const getData = async () => {
    try {
      setIsLoading(true);
      // Fetch all tasks from the API
      setAllTasks((await getApiData()).toReversed());
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Fetch all tasks from the API when the component mounts
  useEffect(() => {
    getData();
  }, []);

  // post new task to the API when newTask changes
  useEffect(() => {
    (async (data) => {
      if (Object.keys(data).length > 0) {
        try {
          await postApiData(data);
          // Refresh the task list after posting a new task
          setNewTask({});

          // After posting a new task, fetch the updated list of tasks
          await getData();
        } catch (error) {
          console.error("Error posting new task:", error);
        }
      }
    })(newTask);
  }, [newTask]);

  /*   useEffect(() => {
    console.log("Hello UseEffect(");

    const postData = async (data) => {
      const res = await axios.post("http://localhost:3000/posts", data);
      console.log(res.status);
    };

    const getData = async () => {
      const res = await axios.get("http://localhost:3000/posts");
      setAllTasks(res.data.toReversed());

      setIsLoading(false);
    };

    if (!_.isEqual(newTask, {})) {
      postData(newTask);
      setNewTask({});
    }

    getData();
  }, [newTask]); */

  /*   const taskArray = [];
  if (allTasks.length >= 0) {
    allTasks.map((task) => {
      taskArray.push(
        <Task
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          category={task.category}
          isComplete={task.isComplete}
        />
      );
    });
  } */

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="space-y-6">
        <div className="text-stone-50 flex justify-between items-center ">
          <h2 className="text-2xl font-semibold tracking-wide">
            All Tasks{" "}
            <span className="text-gray-400">
              ({allTasks.filter((task) => !task.isComplete).length})
            </span>
          </h2>

          {/** add Button*/}
          <button
            onClick={() => setIsVisibleForm(!isVisibleForm)}
            className="text-md font-semibold bg-gradient-to-r to-blue-700 from-purple-700 backdrop-blur px-5 py-2 rounded-xl hover:scale-110 duration-300"
          >
            <b>+</b> New Task
          </button>

          {isVisibleForm && (
            <NewTask
              newTask={newTask}
              setNewTask={setNewTask}
              isVisibleForm={isVisibleForm}
              setIsVisibleForm={setIsVisibleForm}
            />
          )}
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="grid gap-4">
            {/** Tasks List Start here */}
            {allTasks.length === 0 ? (
              <>
                <hr className="border-slate-600" />
                <p className="text-gray-400 text-center text-lg font-semibold">
                  No tasks available!
                </p>
              </>
            ) : (
              allTasks.map((task) => (
                <Task task={task} getData={getData} key={task.id} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTasks;
