import React, { useState } from "react";
import DeleteEditOption from "./DeleteEditOption";
import { IoCalendarClearOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import EditForm from "./EditForm";
import { updateApiData, deleteApiData } from "../services/api";
import { toast } from "react-toastify";

const Task = ({ task, getData }) => {
  const [editTask, setEditTask] = useState(task);

  const [isVisibleEditForm, setIsVisibleEditForm] = useState(false);

  const updateAPI = (updateData) => {
    console.log("API Call Before >>", updateData);
    const res = updateApiData(updateData);
    return res;
  };

  const deleteData = async () => {
    await deleteApiData(editTask.id);
    await getData();
  };

  const checkboxOnChangeHandler = async () => {
    const res = updateAPI({
      ...editTask,
      isComplete: !editTask.isComplete,
    });

    res.isComplete
      ? toast.info("Task Incomplete!")
      : toast.success("Task Complete!");

    setEditTask({
      ...editTask,
      isComplete: !editTask.isComplete,
    });

    /*     let index;
    const checkedTask = allTasks.filter((task, i) => {
      if (task.id === id) {
        index = i;
        return task;
      }
    });
    console.log(checkedTask, index);
    setIsChecked(!isComplete);
    allTasks.splice(index, 1);
    console.log(allTasks);

    setAllTasks([...allTasks, { ...checkedTask[0], isComplete: !isComplete }]);
    editCheckboxHandler({ ...checkedTask[0], isComplete: !isComplete }); */
  };

  const deleteHandler = (isDelete) => {
    isDelete && deleteData() && toast.error("Task deleted successfully!");
  };
  const editHandler = () => {
    setIsVisibleEditForm(true);
  };

  return (
    <>
      <div
        className={`border-yellow-600 rounded-xl shadow-sm border-l-4 bg-slate-800 ${
          editTask.isComplete ? "opacity-50" : ""
        }`}
      >
        <div className="p-4">
          <div className=" flex gap-3 items-start">
            <div>
              <input
                type="checkbox"
                checked={editTask.isComplete}
                onChange={() => checkboxOnChangeHandler()}
                className="rounded-full h-4 w-4"
              ></input>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center text-stone-50">
                <h3
                  className={`text-stone-50 font-semibold tracking-wide ${
                    editTask.isComplete ? "line-through" : ""
                  }`}
                >
                  {editTask.title}
                </h3>

                <DeleteEditOption
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              </div>
              <p className="text-stone-400 text-sm ">{editTask.description}</p>
              <div className=" space-x-2 flex justify-start gap-5 ">
                <p className="flex justify-start px-3 py-1  rounded-full  shadow-inner shadow-slate-900 items-center space-x-1 text-stone-500 text-sm">
                  <IoCalendarClearOutline />
                  <span> {task.date}</span>
                </p>
                <p className="flex justify-start items-center shadow-slate-900 shadow-sm space-x-1 bg-slate-900 px-3 rounded-full py-1 text-stone-500 text-sm">
                  <MdOutlineCategory />
                  <span> {task.category}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isVisibleEditForm && (
        <EditForm
          editTask={editTask}
          setEditTask={setEditTask}
          updateAPI={updateAPI}
          setIsVisibleEditForm={setIsVisibleEditForm}
        />
      )}
    </>
  );
};

export default Task;
