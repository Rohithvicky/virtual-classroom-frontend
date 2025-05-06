import React, { createContext, useState, useMemo } from 'react';

export const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Math 101', description: 'Basic Mathematics', category: 'Mathematics', enrolled: false, progress: 0 },
    { id: 2, title: 'Physics 101', description: 'Introduction to Physics', category: 'Science', enrolled: false, progress: 0 },
    { id: 3, title: 'History 101', description: 'World History', category: 'History', enrolled: false, progress: 0 },
  ]);

  const [assignments] = useState([
    { id: 1, courseId: 1, title: 'Math Assignment 1', course: 'Math 101', status: 'upcoming', dueDate: '2025-05-15' },
    { id: 2, courseId: 2, title: 'Physics Assignment 1', course: 'Physics 101', status: 'submitted', dueDate: '2025-05-18' },
    { id: 3, courseId: 3, title: 'History Assignment 1', course: 'History 101', status: 'graded', dueDate: '2025-05-20' },
  ]);

  const [announcements] = useState([
    { id: 1, courseId: 1, title: 'Welcome to Math 101!', text: 'Class starts on Monday.' },
    { id: 2, courseId: 2, title: 'Physics Lab Update', text: 'Lab schedule has been updated.' },
    { id: 3, courseId: 3, title: 'History Assignment', text: 'Submit your first assignment by Friday.' },
  ]);

  const [liveQuizzes] = useState([
    { id: 1, courseId: 1, title: 'Math Quiz 1', date: '2025-05-10' },
    { id: 2, courseId: 2, title: 'Physics Quiz 1', date: '2025-05-12' },
    { id: 3, courseId: 3, title: 'History Quiz 1', date: '2025-05-15' },
  ]);

  const [liveClasses] = useState([
    { id: 1, courseId: 1, title: 'Math Class 1', date: '2025-05-08' },
    { id: 2, courseId: 2, title: 'Physics Class 1', date: '2025-05-09' },
    { id: 3, courseId: 3, title: 'History Class 1', date: '2025-05-11' },
  ]);

  // Filter data based on enrolled courses
  const enrolledCourses = useMemo(() => courses.filter((course) => course.enrolled), [courses]);

  const filteredAnnouncements = useMemo(
    () => announcements.filter((announcement) => enrolledCourses.some((course) => course.id === announcement.courseId)),
    [announcements, enrolledCourses]
  );

  const filteredLiveQuizzes = useMemo(
    () => liveQuizzes.filter((quiz) => enrolledCourses.some((course) => course.id === quiz.courseId)),
    [liveQuizzes, enrolledCourses]
  );

  const filteredLiveClasses = useMemo(
    () => liveClasses.filter((liveClass) => enrolledCourses.some((course) => course.id === liveClass.courseId)),
    [liveClasses, enrolledCourses]
  );

  // Filter assignments based on enrolled courses
  const filteredAssignments = useMemo(
    () => assignments.filter((assignment) => enrolledCourses.some((course) => course.id === assignment.courseId)),
    [assignments, enrolledCourses]
  );

  return (
    <CoursesContext.Provider
      value={{
        courses,
        setCourses,
        enrolledCourses,
        filteredAnnouncements,
        filteredLiveQuizzes,
        filteredLiveClasses,
        filteredAssignments,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};