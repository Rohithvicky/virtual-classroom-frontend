import React, { createContext, useState } from 'react';
import { courses as initialCourses } from '../pages/CourseList';

export const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState(initialCourses);

  const handleEnroll = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId ? { ...course, enrolled: true } : course
      )
    );
  };

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
};