import { AppActions } from "../types/actions";
import { Store } from "../types";
import { Reducer } from "redux";

export const initialState: Store = {
  students: [],
  marks: []
};

export const rootReducer: Reducer<Store, AppActions> = (
  state = initialState,
  action: AppActions
): Store => {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "SET_MARKS":
      return { ...state, marks: action.payload };
    case "EDIT_STUDENT": {
      let editedStudents = state.students;
      editedStudents[action.payload.id] = action.payload.newValue;
      return { ...state, students: editedStudents };
    }
    case "REMOVE_STUDENT": {
      const filteredStudents = state.students.filter(
        (student, id) => id !== action.payload
      );
      return { ...state, students: filteredStudents };
    }
    case "ADD_STUDENT": {
      return {
        ...state,
        students: [...state.students, action.payload]
      };
    }
    default:
      return state;
  }
};
