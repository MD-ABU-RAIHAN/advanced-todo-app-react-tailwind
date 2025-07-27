import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

import DeleteModal from "./DeleteModal";

const DeleteEditOption = ({ deleteHandler, editHandler }) => {
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);

  const [isDisplayToggleDeleteEditBtn, setIsDisplayToggleDeleteEditBtn] =
    useState(false);
  const buttonDel = useRef(null);

  //useEffect Use for Handle Outsider click
  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonDel.current && !buttonDel.current.contains(event.target)) {
        setIsDisplayToggleDeleteEditBtn(false);
      }
    }

    //add Event Listener when visible
    document.addEventListener("click", handleClickOutside);

    //Clean Up Event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDisplayToggleDeleteEditBtn]);

  const handleDelEditToggle = () => {
    setIsDisplayToggleDeleteEditBtn(!isDisplayToggleDeleteEditBtn);
  };

  return (
    <div ref={buttonDel} className="relative">
      <button
        onClick={handleDelEditToggle}
        className="text-stone-400 hover:text-stone-200 hover:bg-slate-600 p-3 duration-300 rounded-lg"
      >
        <FaEllipsisH />
      </button>

      {isDisplayToggleDeleteEditBtn && (
        <div
          onClick={handleDelEditToggle}
          className=" absolute  z-10 duration-300 top-10 right-10 w-28 bg-slate-900 overflow-hidden  bg-popover  outline-none rounded-lg p-1 flex flex-col gap-0.5"
        >
          <button
            onClick={() => editHandler()}
            className="flex gap-2 duration-150 border-none hover:bg-gray-500 rounded-lg p-0.5 px-2 justify-start items-center gap-2backdrop:blur  "
          >
            <FiEdit3 />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setIsShowDeleteModal(true)}
            className="flex  rounded-lg p-0.5 px-2 hover:bg-red-500 text-red-500 hover:text-white justify-start items-center gap-2 backdrop:blur  "
          >
            <RiDeleteBin5Line /> <span>Delete</span>
          </button>
        </div>
      )}
      {isShowDeleteModal && (
        <DeleteModal
          setOpen={isShowDeleteModal}
          deleteHandler={deleteHandler}
        />
      )}
    </div>
  );
};

export default DeleteEditOption;
