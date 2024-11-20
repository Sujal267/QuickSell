// App.js
import './App.css';
import Tasks from './Tasks';
import Navbar from './Navbar';
import React, { useState } from 'react';

function App() {
  const [grouping, setGrouping] = useState('Status');
  const [ordering, setOrdering] = useState('Priority');

  return (
    <div className="App">
      <Navbar
        grouping={grouping}
        ordering={ordering}
        onGroupingChange={setGrouping}
        onOrderingChange={setOrdering}
      />
      <Tasks grouping={grouping} ordering={ordering} />
    </div>
  );
}

export default App;