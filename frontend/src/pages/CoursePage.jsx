import React from 'react';
import CourseDetail from '../components/CourseDetail';

const CoursePage = ({ roles }) => {
  return (
    <div>

      <CourseDetail roles={roles} />
    </div>
  );
};

export default CoursePage;
