import React from 'react';

export const courses = [
  {
    id: 1,
    title: 'Java Programming',
    description: 'Learn Java programming basics.',
    instructor: 'Prof. Johnson',
    enrolled: true,
  },
  {
    id: 2,
    title: 'Foundations of Data Science',
    description: 'Introduction to data science concepts.',
    instructor: 'Dr. Patel',
    enrolled: true,
  },
];

const CourseList = () => {
  return <div>Course List Component</div>;
};

export default CourseList;