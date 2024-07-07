import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement);

const ProjectVisualize = ({ tasks }) => {
    // Count tasks based on status
    const completedTasks = tasks.filter((task) => task.status === 'Completed').length;
    const pendingTasks = tasks.filter((task) => task.status === 'Pending').length;
    const progressTasks = tasks.filter((task) => task.status === 'In Progress').length;

    const totalTasks = tasks.length;

    // Calculate percentage of tasks completed
    const percentageCompleted = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const barData = {
      labels: ['Progress'],
      datasets: [{
          label: 'Progress',
          data: [percentageCompleted],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          
      }]
  };

  const barOptions = {
      responsive: true,
      maintainAspectRatio: false,
  };
    // Doughnut chart data and options
    const doughnutData = {
        labels: ['In Progress', 'Pending', 'Completed'],
        datasets: [{
            label: 'Task Status',
            data: [progressTasks, pendingTasks, completedTasks],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4
        }]
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    // Bar chart data and options
    

    
    return (
        <Paper sx={{ m: 1, p: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                <div style={{ width: '300px', height: '300px' }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
                <div style={{ marginLeft: '100px', textAlign: 'center' }}>
                    <h1>{tasks.length}</h1>
                    <h2>TOTAL TASKS</h2>
                </div>
                
            </div>
        </Paper>
    );
};

export default ProjectVisualize;
