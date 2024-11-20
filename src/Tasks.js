import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Tasks.css';
// Keep all your existing SVG imports
import { ReactComponent as BacklogIcon } from './icons_FEtask/Backlog.svg';
import { ReactComponent as TodoIcon } from './icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from './icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from './icons_FEtask/Done.svg';
import { ReactComponent as CancelledIcon } from './icons_FEtask/Cancelled.svg';
import { ReactComponent as Add } from './icons_FEtask/add.svg';
import { ReactComponent as ThreeDot } from './icons_FEtask/3 dot menu.svg';
// Add priority icon imports
import urgentIcon from './icons_FEtask/SVG - Urgent Priority colour.svg';
import highIcon from './icons_FEtask/Img - High Priority.svg';
import mediumIcon from './icons_FEtask/Img - Medium Priority.svg';
import lowIcon from './icons_FEtask/Img - Low Priority.svg';
import noPriorityIcon from './icons_FEtask/No-priority.svg';

const TaskBoard = ({ grouping, ordering }) => {
    // Initialize state variables
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when component mounts
    useEffect(() => {
        fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
            .then((response) => response.json())
            .then((data) => {
                setTasks(data.tickets);
                setUsers(data.users);
                setLoading(false);
            })
            .catch((error) => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            width="50"
            height="50"
            style={{ animation: 'spin 1s linear infinite' }}
          >
            <circle cx="25" cy="25" r="20" stroke="#4fa94d" strokeWidth="5" fill="none" />
            <path
              fill="none"
              stroke="#4fa94d"
              strokeWidth="5"
              strokeLinecap="round"
              d="M5 25a20 20 0 1 0 40 0a20 20 0 1 0 -40 0"
              style={{
                strokeDasharray: '125.6',
                strokeDashoffset: '62.8',
                animation: 'dash 1.5s ease-in-out infinite'
              }}
            />
          </svg>
        </div>
      );
      
    if (error) return <div>{error}</div>;

    const getPriorityInfo = (priority) => {
        switch (priority) {
            case 4:
                return { label: "Urgent", icon: urgentIcon };
            case 3:
                return { label: "High", icon: highIcon };
            case 2:
                return { label: "Medium", icon: mediumIcon };
            case 1:
                return { label: "Low", icon: lowIcon };
            case 0:
            default:
                return { label: "No Priority", icon: noPriorityIcon };
        }
    };

    const profileIcon = "https://cdn.jsdelivr.net/npm/heroicons@2.0.16/24/outline/user-circle.svg";

    const getGroupedTasks = () => {
        if (!tasks.length) return {};
        
        let orderedTasks = [...tasks];

        // Apply ordering
        if (ordering === 'Priority') {
            orderedTasks.sort((a, b) => b.priority - a.priority);
        } else if (ordering === 'Title') {
            orderedTasks.sort((a, b) => a.title.localeCompare(b.title));
        }

        // Apply grouping
        if (grouping === 'Status') {
            const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
            return statuses.reduce((acc, status) => {
                acc[status] = orderedTasks.filter((task) => task.status === status);
                return acc;
            }, {});
        } else if (grouping === 'User') {
            return users.reduce((acc, user) => {
                acc[user.name] = orderedTasks.filter((task) => task.userId === user.id);
                return acc;
            }, {});
        } else if (grouping === 'Priority') {
            const priorities = [4, 3, 2, 1, 0];
            return priorities.reduce((acc, priority) => {
                const priorityInfo = getPriorityInfo(priority);
                acc[priorityInfo.label] = orderedTasks.filter((task) => task.priority === priority);
                return acc;
            }, {});
        }
        return {};
    };

    const groupedTasks = getGroupedTasks();

    // Determine columns based on grouping
    const getColumns = () => {
        if (grouping === 'Status') {
            return ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
        } else if (grouping === 'Priority') {
            return ['Urgent', 'High', 'Medium', 'Low', 'No Priority'];
        } else if (grouping === 'User') {
            return users.map(user => user.name);
        }
        return [];
    };

    const columns = getColumns();

    // Status icons mapping
    const statusIcons = {
        'Backlog': <BacklogIcon />,
        'Todo': <TodoIcon />,
        'In progress': <InProgressIcon />,
        'Done': <DoneIcon />,
        'Cancelled': <CancelledIcon />,
    };

    // Priority icons mapping
    const priorityIcons = {
        'Urgent': <img src={urgentIcon} alt="Urgent" className="column-icon" />,
        'High': <img src={highIcon} alt="High" className="column-icon" />,
        'Medium': <img src={mediumIcon} alt="Medium" className="column-icon" />,
        'Low': <img src={lowIcon} alt="Low" className="column-icon" />,
        'No Priority': <img src={noPriorityIcon} alt="No Priority" className="column-icon" />,
    };

    return (
        <div className="task-board">
            {columns.map((columnKey) => (
                <div key={columnKey} className="task-column">
                    <div className="column-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p className="column-title" style={{ display: 'flex', alignItems: 'center' }}>
                            {/* Conditionally render the profile icon for 'User' grouping */}
                            {grouping === 'User' && (
                                <img src={profileIcon} alt="Profile Icon" style={{ marginRight: '8px',width:'20px' }} />
                            )}
                            <span>
                                <span style={{marginRight:'6px'}}>{grouping === 'Status' && statusIcons[columnKey]}</span>
                                {grouping === 'Priority' && priorityIcons[columnKey]}
                                {columnKey}
                            </span>
                        </p>
                        <span style={{ 'marginLeft': '5%', 'marginTop': '1%' }} className="task-count">
                            {groupedTasks[columnKey]?.length || 0}
                        </span>
                        <div className="column-actions">
                            <Add style={{marginRight:'3px'}} />
                            <ThreeDot />
                        </div>
                    </div>
                    <div className="task-list">
                        {groupedTasks[columnKey]?.map((task) => (
                            <Card
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                status={task.status}
                                tag={task.tag[0]}
                                priority={task.priority}
                                user={users.find(u => u.id === task.userId)}
                                grouping={grouping} // Pass grouping to Card
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskBoard;