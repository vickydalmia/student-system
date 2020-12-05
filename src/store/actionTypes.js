const { SET_STUDENTS, DELETE_STUDENT, EDIT_STUDENT } = require("./actions")

export const addStudents = (data) => {
    return {
        type: SET_STUDENTS,
        payload: data
    }
}

export const deleteStudent = (data) => {
    return {
        type: DELETE_STUDENT,
        payload: data
    }
}

export const editStudent = (data) => {
    return {
        type: EDIT_STUDENT,
        payload: data
    }
}