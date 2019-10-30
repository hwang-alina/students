import { Student } from "../types/Student";
import { AppActions } from "../types/actions";

export const setStudents = (students: Student[]): AppActions => {
  window.localStorage.setItem("students", JSON.stringify(students));
  return {
    type: "SET_STUDENTS",
    payload: students
  };
};

export const setMarks = (marks: string[]): AppActions => {
  window.localStorage.setItem("marks", JSON.stringify(marks));
  return {
    type: "SET_MARKS",
    payload: marks
  };
};

export const addStudent = (student: Student): AppActions => {
  return {
    type: "ADD_STUDENT",
    payload: student
  };
};

export const removeStudent = (studentID: number): AppActions => {
  return {
    type: "REMOVE_STUDENT",
    payload: studentID
  };
};

export const editStudent = (studentID: number, newValue: Student) => {
  return {
    type: "EDIT_STUDENT",
    payload: {
      id: studentID,
      newValue: newValue
    }
  };
};
