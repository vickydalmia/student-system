import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Layout from "../../components/Layout";
import {
  checkfile,
  exportToCSV,
  readUploadedFileAsText,
} from "../../utils/fileReader";
import { toast } from "react-toastify";
import "./list.css";
import { useDispatch, useSelector } from "react-redux";
import { addStudents, deleteStudent } from "../../store/actionTypes";
import { useHistory } from "react-router-dom";
import { useScrollPage } from "../../hooks/useScrollPage";
import { pageReducer } from "../../hooks/scrollPageReducer";

const StudentList = () => {
  const inputFile = useRef();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [pageStudent, pageDispatch] = useReducer(pageReducer, {
    page: 0,
  });

  const modifiedStudents =
    Array.isArray(students) && students.slice(0, pageStudent.page * 15);
  const lastRef = useScrollPage(false, false, pageDispatch);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [pageStudent]);

  const fileHandler = async (event) => {
    setIsLoading(true);
    let validExtension = [".xlsx", ".xls"];
    const isValid = checkfile(event.target.files[0], validExtension);
    if (!isValid) {
      return toast.error("Only file wil .xls & .xlsx is allowed");
    }
    let data = await readUploadedFileAsText(event.target.files[0]);

    if (!Array.isArray(data)) {
      return toast.error("Something went wrong");
    }
    if (Array.isArray(data).length === 0) {
      return toast.error("No data to upload");
    }
    setIsLoading(false);
    dispatch(addStudents(data));
    window.location.href = "/";
  };

  const exportFile = (fileName) => {
    exportToCSV(students, fileName);
  };

  const deleteHandler = (index) => {
    let filterdData = students.filter((each, indexNumber) => {
      if (indexNumber !== index) {
        return true;
      }
    });

    console.log(filterdData);
    dispatch(deleteStudent(filterdData));
  };

  const editHandler = (index, data) => {
    history.push({
      pathname: `/edit-student/${index}`,
      state: {
        formData: data,
      },
    });
  };

  return (
    <Layout isLoading={isLoading}>
      {Array.isArray(students) && students.length === 0 && (
        <div className="upload-file-wrapper">
          <p>
            <strong>Upload CSV file to upload students</strong>
          </p>
          <div>
            <input
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={fileHandler}
            ></input>
            <button
              className="button"
              onClick={() => {
                if (inputFile.current) inputFile.current.click();
              }}
            >
              +Upload Students
            </button>
          </div>
        </div>
      )}
      {Array.isArray(students) && students.length > 0 && (
        <>
          <div className="top-buttons">
            <button
              className="button add-student"
              onClick={() => history.push("/add-student")}
            >
              Add Student
            </button>
            <input
              type="file"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={fileHandler}
            ></input>
            <button
              className="button"
              onClick={() => {
                if (inputFile.current) inputFile.current.click();
              }}
            >
              Upload More Students
            </button>
            <button
              className="button download-student"
              onClick={() => {
                exportFile("students");
              }}
            >
              Download Students Data
            </button>
          </div>
          <TableContainer component={Paper} style={{ marginTop: "20px" }}>
            <Table aria-label="student list" style={{ marginTop: "20px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Student Id</TableCell>
                  <TableCell align="left">First Name</TableCell>
                  <TableCell align="left">Last Name</TableCell>
                  <TableCell align="left">Gender</TableCell>
                  <TableCell align="left">DOB</TableCell>
                  <TableCell align="left" />
                  <TableCell align="left" />
                </TableRow>
              </TableHead>
              <TableBody>
                {modifiedStudents.map((row, index) => (
                  <TableRow key={index + 1}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{row[0]}</TableCell>
                    <TableCell align="left">{row[1]}</TableCell>
                    <TableCell align="left">{row[2]}</TableCell>
                    <TableCell align="left">{row[3]}</TableCell>
                    <TableCell align="left">
                      <button
                        className="edit-button"
                        onClick={() => editHandler(index + 1, row)}
                      >
                        Edit
                      </button>
                    </TableCell>
                    <TableCell align="left">
                      <button
                        className="delete-button"
                        onClick={() => deleteHandler(index)}
                      >
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
                <tr className="last-element" ref={lastRef}></tr>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Layout>
  );
};

export default StudentList;
