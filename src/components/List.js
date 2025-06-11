import React, { useState } from 'react';
import '../styles/List.css';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { createNewTaskReducer, deleteListReducer, editListTitleReducer } from '../boardSlice';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import Task from '../components/Task';

const List = ({ list }) => {

    const dispatch = useDispatch();

    const [taskValue, setTaskValue] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setModalText('');
        setIsModalOpen(false);
    }

    const addTask = async () => {
        if (taskValue === "") {
            window.alert("Please enter a task");
            return;
        }
        dispatch(createNewTaskReducer({listId: list.listId, taskTitle: taskValue}));
        setTaskValue('');
    }

    const editListTitle = async () => {
        if (modalText === "") {
            window.alert("Please enter updated list name");
            return;
        }
        dispatch(editListTitleReducer({listId: list.listId, updatedListTitle: modalText}));
        setModalText('');
        closeModal();
    }

    const deleteList = async () => {
        dispatch(deleteListReducer({listId: list.listId}));
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
            alignItems: 'center',
            justifyContent: 'center',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    };

    return (
        <div data-testid='list' className="list">
            <div className="list-title">
                <div className="list-title-part-one">
                    <h2 data-testid='list-title' className="list-title-text"> { list.listTitle } </h2>
                </div>
                <div className="list-title-part-two">
                    <ModeEditIcon data-testid='list-title-edit' style={{ fontSize: "25px", marginLeft: "15%" }} onClick={() => openModal()}/>
                </div>
            </div>
            <Droppable key={list.listId} droppableId={list.listId} type="taskDrag">
                {(provided) => (
                    <div 
                        className={list.tasks.length === 0 ? 'list-content-empty' : 'list-content'}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        data-testid='list-data'
                    >
                        {list.tasks.length === 0 ? (
                            <h2> No tasks available! </h2>
                        ) : (
                            list.tasks.map((task, index) => (
                                <Draggable draggableId={task.taskId} key={task.taskId} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            ref={provided.innerRef}
                                            data-testid='draggable-task'
                                        >
                                            <Task
                                                list={list}
                                                task={task}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="list-edit">
                <div className="list-edit-part-one">
                    <input
                        type="text"
                        value={taskValue}
                        onChange={(event) => setTaskValue(event.target.value)}
                        placeholder="Add Task"
                        className="list-edit-input"
                        data-testid='list-task-add-section-input'
                    />
                    <AddIcon data-testid='list-task-add-section-add-task' onClick={() => addTask()} style={{ fontSize: "40px", marginLeft: "10%" }}/>
                </div>
                <div className="list-edit-part-two">
                    <button data-testid='delete-list-button' className="list-edit-button" onClick={() => deleteList()}> Delete </button>
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                ariaHideApp={false} 
                onRequestClose={() => closeModal()}
                style={modalStyles}
                testId='list-title-edit-modal'
            >
                <CloseIcon data-testid='list-title-edit-modal-close' style={{ fontSize: "3.5em", color: "red", position: "absolute", top: 0, right: 0, padding: "10px" }} onClick={() => closeModal()}/>
                <h2 data-testid='list-title-in-modal' style={{ marginBottom: "4%", fontSize: "2em" }}>
                    Current list name: <span style={{ color: "#909091" }}>{list.listTitle}</span>
                </h2>
                <input
                    type="text"
                    value={modalText}
                    onChange={(event) => setModalText(event.target.value)}
                    placeholder="Enter new list name"
                    className="modal-input"
                    data-testid='list-title-edit-input'
                />
                <button data-testid='edit-list-title-button' className="modal-button" onClick={() => editListTitle()}> Update list name </button>
            </Modal>
        </div>
    );
};

export default List;