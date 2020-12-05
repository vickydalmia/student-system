import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style";
import { Container } from "@material-ui/core";
import Loader from "../Loader";

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      {props.isLoading && <Loader />}
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Student System
          </Typography>
          </Toolbar>
        </AppBar>
        <Container fixed>{props.children}</Container>
      </div>
    </>
  );
};

export default Layout;
