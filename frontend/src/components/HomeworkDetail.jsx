import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getHomeworkById } from '../services/api';
import { Typography, CircularProgress } from '@mui/material';

const HomeworkDetail = () => {
  const { id } = useParams();
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHomeworkById(id)
      .then((response) => {
        setHomework(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Typography variant="h4">Homework</Typography>
      <Typography variant="body1">{homework.task}</Typography>
      <Typography variant="body2">Deadline: {homework.deadline}</Typography>
    </div>
  );
};

export default HomeworkDetail;
