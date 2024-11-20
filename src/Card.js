import React from 'react';
import './Card.css';

// Importing SVGs for each priority
import urgentIcon from './icons_FEtask/SVG - Urgent Priority grey.svg';
import highIcon from './icons_FEtask/Img - High Priority.svg';
import mediumIcon from './icons_FEtask/Img - Medium Priority.svg';
import lowIcon from './icons_FEtask/Img - Low Priority.svg';
import noPriorityIcon from './icons_FEtask/No-priority.svg';

// Import status icons
import { ReactComponent as BacklogIcon } from './icons_FEtask/Backlog.svg';
import { ReactComponent as TodoIcon } from './icons_FEtask/To-do.svg';
import { ReactComponent as InProgressIcon } from './icons_FEtask/in-progress.svg';
import { ReactComponent as DoneIcon } from './icons_FEtask/Done.svg';
import { ReactComponent as CancelledIcon } from './icons_FEtask/Cancelled.svg';

// Importing profile icon
const profileIcon = "https://cdn.jsdelivr.net/npm/heroicons@2.0.16/24/outline/user-circle.svg";

const Card = ({ id, title, status, tag, priority, user, grouping }) => {
  // Function to get the priority label and icon based on priority value
  const getPriorityLabel = (priority) => {
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
        return { label: "No priority", icon: noPriorityIcon };
      default:
        return { label: "Unknown", icon: null };
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return <BacklogIcon className="status-icon" />;
      case 'Todo':
        return <TodoIcon className="status-icon" />;
      case 'In progress':
        return <InProgressIcon className="status-icon" />;
      case 'Done':
        return <DoneIcon className="status-icon" />;
      case 'Cancelled':
        return <CancelledIcon className="status-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="id-profile-wrapper">
          <span className="task-id" style={{ fontSize: '14px', color: '#787878' }}>{id}</span>

          {/* Conditionally render profile icon when grouping is not 'User' */}
          {grouping !== 'User' && (
            <img src={profileIcon} alt="Profile Icon" className="profile-icon" />
          )}
        </div>
        <div className="user-info">
          <div className={`availability-indicator ${user?.available ? 'available' : ''}`} />
        </div>
      </div>

      <div
        className={`title-wrapper ${grouping !== 'Status' ? 'no-flex' : ''}`}
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          marginLeft: '-6%',
        }}
      >
        <div
          style={{
            flexShrink: 0,
            marginRight: '2px',
          }}
        >
          {/* Conditionally render status icon */}
          {grouping !== 'Status' && getStatusIcon(status)}
        </div>

        <p
          className="title"
          style={{
            flexGrow: 1,
            margin: 0,
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            marginLeft: grouping === 'Status' ? '5%' : '0',
            fontWeight: '20px'
          }}
        >
          {title}
        </p>
      </div>

      <div className="card-footer">
        <div className="priority-tag" style={{ marginTop: '5px' }}>
          <span className="priority-indicator" style={{ marginTop: '3px' }}>
            {/* Conditionally render priority icon */}
            {grouping !== 'Priority' && getPriorityLabel(priority).icon && (
              <img style={{ paddingTop: '2px' }} src={getPriorityLabel(priority).icon} alt={getPriorityLabel(priority).label} />
            )}
          </span>
          <span className="tag-with-border">
            <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight:'4px' }}>
              <circle cx="5" cy="5" r="5" fill="grey" />
            </svg>
            {tag && <span >{tag}</span>}

          </span>

        </div>
      </div>
    </div>
  );
};

export default Card;
