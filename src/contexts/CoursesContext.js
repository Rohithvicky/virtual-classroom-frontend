import React, { createContext, useState, useMemo } from 'react';

export const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'Math 101', description: 'Basic Mathematics', category: 'Mathematics', enrolled: false },
    { id: 2, title: 'Physics 101', description: 'Introduction to Physics', category: 'Science', enrolled: false },
  ]);

  const [liveClasses, setLiveClasses] = useState([
    { id: 1, courseId: 1, title: 'Math Class 1', date: '2025-05-08', meetLink: 'https://meet.google.com/math-class' },
  ]);

  const [liveQuizzes, setLiveQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [announcements] = useState([
    { id: 1, courseId: 1, title: 'Welcome to Math 101!', text: 'Class starts on Monday.' },
    { id: 2, courseId: 2, title: 'Physics Lab Update', text: 'Lab schedule has been updated.' },
    { id: 3, courseId: 3, title: 'History Assignment', text: 'Submit your first assignment by Friday.' },
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
        liveClasses,
        setLiveClasses,
        liveQuizzes,
        setLiveQuizzes,
        assignments,
        setAssignments,
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