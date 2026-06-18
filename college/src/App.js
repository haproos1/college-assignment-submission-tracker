import React, { useState } from 'react';
import './App.css';

function App() {
  // Initial Sample Data
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'React Hooks Basics', subject: 'Web Development', dueDate: '2026-06-20', status: 'Pending' },
    { id: 2, title: 'Database Design', subject: 'DBMS', dueDate: '2026-06-15', status: 'Submitted' },
    { id: 3, title: 'Network Protocols', subject: 'Networks', dueDate: '2026-06-10', status: 'Late' },
  ]);

  // Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  // Filter State
  const [filterSubject, setFilterSubject] = useState('All');

  // Function to Add New Assignment
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!title || !subject || !dueDate) {
      alert('Please fill out all fields!');
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: 'Pending' // Default status
    };

    setAssignments([...assignments, newAssignment]);
    
    // Reset Form Fields
    setTitle('');
    setSubject('');
    setDueDate('');
  };

  // Function to Update Assignment Status
  const handleStatusChange = (id, newStatus) => {
    const updatedAssignments = assignments.map((asm) => 
      asm.id === id ? { ...asm, status: newStatus } : asm
    );
    setAssignments(updatedAssignments);
  };

  // Dashboard Counter Logic
  const totalCount = assignments.length;
  const submittedCount = assignments.filter(a => a.status === 'Submitted').length;
  const pendingCount = assignments.filter(a => a.status === 'Pending').length;
  const lateCount = assignments.filter(a => a.status === 'Late').length;

  // Filtering Logic
  const filteredAssignments = filterSubject === 'All' 
    ? assignments 
    : assignments.filter(a => a.subject.toLowerCase() === filterSubject.toLowerCase());

  // Generate Unique Subjects dynamically for the filter dropdown
  const uniqueSubjects = ['All', ...new Set(assignments.map(a => a.subject))];

  return (
    <div className="container">
      <h1>College Assignment Submission Tracker</h1>

      {/* DASHBOARD SUMMARY (COUNTS) */}
      <div className="dashboard-summary">
        <div className="card total">
          <h3>Total</h3>
          <p>{totalCount}</p>
        </div>
        <div className="card submitted">
          <h3>Submitted</h3>
          <p>{submittedCount}</p>
        </div>
        <div className="card pending">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>
        <div className="card late">
          <h3>Late</h3>
          <p>{lateCount}</p>
        </div>
      </div>

      <div className="form-filter-section">
        {/* ADD ASSIGNMENT FORM */}
        <div className="form-box">
          <h2>Add New Assignment</h2>
          <form onSubmit={handleAddAssignment}>
            <div className="form-group">
              <label>Assignment Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Ex: React Project"
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Ex: Web Development"
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)} 
              />
            </div>
            <button type="submit">Add Assignment</button>
          </form>
        </div>

        {/* FILTER BY SUBJECT */}
        <div className="filter-box">
          <h2>Filter Assignments</h2>
          <div className="form-group">
            <label>Select Subject</label>
            <select value={filterSubject} onChange={(e) => setFilterSubject(e.target.value)}>
              {uniqueSubjects.map((sub, index) => (
                <option key={index} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ASSIGNMENTS LIST TABLE */}
      <div className="table-container">
        <h2>Assignment Details</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Subject</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No assignments found.</td>
              </tr>
            ) : (
              filteredAssignments.map((asm) => (
                <tr key={asm.id}>
                  <td>{asm.title}</td>
                  <td>{asm.subject}</td>
                  <td>{asm.dueDate}</td>
                  <td>
                    <span className={`badge ${asm.status.toLowerCase()}`}>
                      {asm.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      className="status-select"
                      value={asm.status} 
                      onChange={(e) => handleStatusChange(asm.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Late">Late</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;