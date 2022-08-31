import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TextField } from "@material-ui/core";

export default (props) => {
  const classes = useStyles();
  return (
    <>
      <TextField
        {...props}
        variant="outlined"
        InputProps={{
          classes: { root: classes.inputRoot },
          endAdornment: props.endAdornment
        }}
      />
      {props.errormessage && props.errormessage.length > 0 && (
        <div className={classes.errorMessage}>{props.errormessage}</div>
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    backgroundColor: "transparent !important",
    "& input": {
      padding: 10
    }
  },
  errorMessage: {
    color: "#FF0000",
    paddingTop: "5px"
  }
}));
