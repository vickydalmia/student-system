import React from "react";
import { Route } from "react-router-dom";
import StudentList from "./containers/Student/List";
import AddStudent from "./containers/Student/Add";
import EditStudent from "./containers/Student/Edit";

const App = () => {
  return (
    <>
      <Route exact path="/" component={StudentList} />
      <Route exact path="/add-student" component={AddStudent}/>
      <Route exact path="/edit-student/:id" component={EditStudent}/>
    </>
  );
};

export default App;
