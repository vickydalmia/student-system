import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { addStudents } from "../../store/actionTypes";
import './add.css';

const Add = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const history = useHistory()

  const inputHandler = (event) =>{
    setFormData((state)=>({...state, [event.target.name]:event.target.value}));
  }

  const formHandler = (event) =>{
    event.preventDefault();
    let data = [[formData['firstName'], formData['lastName'], formData['gender'], formData['dob']]];
    dispatch(addStudents(data));
    toast.success('student added successfully');
    history.push('/');
  }

  console.log(formData);
  return (
    <Layout>
      <div className="container">
        <form id="student-form" onSubmit={formHandler}>
          <h3>Add Student Details</h3>
          <fieldset>
            <input
              placeholder="First Name"
              type="text"
              required
              autoFocus
              value={formData['firstName'] || ""}
              name="firstName"
              onChange={inputHandler}
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Last Name"
              type="text"
              value={formData['lastName'] || ""}
              name="lastName"
              onChange={inputHandler}
              required
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="Gender"
              type="text"
              value={formData['gender'] || ""}
              name="gender"
              onChange={inputHandler}
              required
            />
          </fieldset>
          <fieldset>
            <input
              placeholder="DOB"
              type="text"
              value={formData['dob'] || ""}
              name="dob"
              onChange={inputHandler}
              required
            />
          </fieldset>
          <fieldset>
            <button
              name="submit"
              type="submit"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
};

export default Add;
