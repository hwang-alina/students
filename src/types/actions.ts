import {Student} from "./Student";

export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_MARKS = 'SET_MARKS';
export const ADD_STUDENT = 'ADD_STUDENT';
export const EDIT_STUDENT = 'EDIT_STUDENT';
export const REMOVE_STUDENT = 'REMOVE_STUDENT';

export interface SetStudentsAction {
    type: typeof SET_STUDENTS,
    payload: Student[]
}

export interface SetMarksAction {
    type: typeof SET_MARKS,
    payload: string[]
}

export interface AddStudentAction {
    type: typeof ADD_STUDENT,
    payload: Student
}

export interface EditStudentAction {
    type: typeof EDIT_STUDENT,
    payload: {id: number, newValue:Student}
}

export interface RemoveStudentAction {
    type: typeof REMOVE_STUDENT,
    payload: number
}

export type StudentActionTypes =
    | SetStudentsAction
    | EditStudentAction
    | RemoveStudentAction
    | AddStudentAction;

export type AppActions = StudentActionTypes | SetMarksAction;
