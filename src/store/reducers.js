import { getLSValue, setLSValue } from "../utils/localStorage";
import { DELETE_STUDENT, EDIT_STUDENT, GET_STUDENTS, SET_STUDENTS } from "./actions";

const initialState = {
  students: getLSValue("students") ? getLSValue("students") : [],
};

const setStudents = (state, action) => {
  console.log(state, action);
  let students = state.students;
  console.log(students);
  students = [...students, ...action.payload];
  setLSValue("students", students);
  return { ...state, students };
};

const deleteStudent = (state, action) => {
  setLSValue("students", action.payload);
  return { students: action.payload };
};

const editStudent = (state, action) => {
  let newStudents = state.students.map((each, index)=>{
    if(index === action.payload.index){
      return action.payload.formData;
    }
    return each;
  })
  setLSValue("students", newStudents);
  return { students: newStudents };
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return setStudents(state, action);
    case DELETE_STUDENT:
      return deleteStudent(state, action);
    case EDIT_STUDENT:
      return editStudent(state, action);
    default:
      return state;
  }
};
