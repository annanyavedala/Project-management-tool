import React from 'react';
import TaskForm from './Task';
import { useParams } from 'react-router-dom';

const ProjectDetail = () => {
    const { projectId } = useParams(); // Extract projectId from URL params

    return (
        <div>
            <TaskForm projectId={projectId} />
        </div>
    );
};

export default ProjectDetail;
