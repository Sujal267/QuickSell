// src/Navbar.js
import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { ReactComponent as Display } from './icons_FEtask/Display.svg';
import { ReactComponent as Down } from './icons_FEtask/down.svg';

const Navbar = ({ grouping, ordering, onGroupingChange, onOrderingChange }) => {
    const [displayOpen, setDisplayOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDisplayOpen(false);
            }
        };

        if (displayOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [displayOpen]);

    const toggleDisplay = () => setDisplayOpen(!displayOpen);

    return (
        <nav className="navbar">
            <div className="dropdown" ref={dropdownRef}>
                <button className="display-button" onClick={toggleDisplay}>
                    <Display />
                    Display
                    <Down />
                </button>

                {displayOpen && (
                    <div className="dropdown-content">
                        <div className="dropdown-row">
                            <span>Grouping</span>
                            <select
                                value={grouping}
                                onChange={(e) => onGroupingChange(e.target.value)}
                            >
                                <option value="Status">Status</option>
                                <option value="User">User</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </div>

                        <div className="dropdown-row">
                            <span>Ordering</span>
                            <select
                                value={ordering}
                                onChange={(e) => onOrderingChange(e.target.value)}
                            >
                                <option value="Priority">Priority</option>
                                <option value="Title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;