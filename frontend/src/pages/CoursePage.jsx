import React from 'react';
import CourseDetail from '../components/CourseDetail';

const CoursePage = ({ role }) => {
  return (
    <div>

      <CourseDetail role={role} />
    </div>
  );
};

export default CoursePage;
