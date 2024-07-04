import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  CardActions,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CourseCard = ({ course, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Запланирован':
        return 'gray';
      case 'Идёт':
        return 'green';
      case 'Закончен':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <Card style={{ marginBottom: '10px', backgroundColor: getStatusColor(course.status) }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {course.name}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2">
            {course.description}
          </Typography>
          <Typography variant="body2">
            Дата начала: {course.date_start}
          </Typography>
          <Typography variant="body2">
            Статус: {course.status}
          </Typography>
          <CardActions>
            <Button onClick={() => onEdit(course)}>Изменить</Button>
            <Button onClick={() => onDelete(course.id)}>Удалить</Button>
          </CardActions>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
