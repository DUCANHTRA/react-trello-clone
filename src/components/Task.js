import React, { useState } from 'react';
import '../styles/Task.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { deleteTaskReducer, editTaskReducer } from '../boardSlice';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';

const Task = ({ list, task }) => {

    const dispatch = useDispatch();

    const [modalTaskValue, setModalTaskValue] = useState(task.taskTitle);
    const [modalDescriptionValue, setModalDescriptionValue] = useState(task.taskDescription);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setModalTaskValue(task.taskTitle);
        setModalDescriptionValue(task.taskDescription);
        setIsModalOpen(true)
    };
    const closeModal = () => {
        setModalTaskValue(task.taskTitle);
        setModalDescriptionValue(task.taskDescription);
        setIsModalOpen(false);
    }

    const editTask = async () => {
        if (modalTaskValue === "") {
            window.alert("Task title cannot be empty! Please write title for the task.");
            return;
        }
        dispatch(editTaskReducer(
            {
                listId: list.listId,
                taskId: task.taskId,
                updatedTaskTitle: modalTaskValue,
                updatedTaskDescription: modalDescriptionValue
            }
        ));
        closeModal();
    }

    const deleteTask = async () => {
        dispatch(deleteTaskReducer({listId: list.listId, taskId: task.taskId}));
    }

    const modalStyles = {
        content: {
            minWidth: '500px',
            minHeight: '500px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };

    return (
        <div data-testid='task' className="task">
            <div className="task-title">
                <span data-testid='task-title' className="task-title-text"> { task.taskTitle } </span>
            </div>
            <div className="task-modify">
                <ModeEditIcon data-testid='task-edit' style={{ fontSize: "20px", marginRight: "10%" }} onClick={() => openModal()}/>
                <CloseIcon data-testid='task-delete' style={{ fontSize: "20px", color: "red" }} onClick={() => deleteTask()}/>
            </div>

            <Modal 
                isOpen={isModalOpen} 
                ariaHideApp={false} 
                onRequestClose={() => closeModal()}
                style={modalStyles}
                testId='task-edit-modal'
            >
                <CloseIcon data-testid='task-edit-modal-close' style={{ fontSize: "40px", color: "red", position: "absolute", top: 0, right: 0, padding: "10px" }} onClick={() => closeModal()}/>
                <div className='task-modal-part-one'>
                    <h2 data-testid='list-name' style={{ marginTop: "3%", marginBottom: "1%", fontSize: "26px" }}>
                        List name: <span style={{ color: "#909091" }}>{list.listTitle}</span>
                    </h2>
                </div>
                <div className='task-modal-part-two'>
                    <div className='task-part'>
                        <span style={{ marginLeft: "17%", fontSize: "30px" }}> Task title </span>
                        <input 
                            type="text"
                            className="task-part-input"
                            placeholder="Enter task title"
                            value={modalTaskValue}
                            onChange={(event) => setModalTaskValue(event.target.value)}
                            data-testid='task-title-edit-input'
                        />
                    </div>
                    <div className='description-part'>
                        <span style={{ marginLeft: "8.3%", fontSize: "25px" }}> Task description </span>
                        <textarea
                            type="text"
                            className="task-part-text-area"
                            placeholder="Enter task description"
                            value={modalDescriptionValue}
                            onChange={(event) => setModalDescriptionValue(event.target.value)}
                            data-testid='task-description-edit-input'
                        />
                    </div>
                </div>
                <div className='task-modal-part-three'>
                    <button data-testid='task-update-button' className="task-modal-button" onClick={() => editTask()}> Update task details </button>
                </div>
            </Modal>
        </div>
    );
}

export default Task;