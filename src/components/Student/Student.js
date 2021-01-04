import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Badge,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  secondaryText: {
    color: theme.palette.primary.red,
    fontSize: "12px",
  },
}));

const StyledBadgeGreen = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);

const StyledBadgeRed = withStyles((theme) => ({
  badge: {
    backgroundColor: "#f44336",
    color: "#f44336",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);

const StyledBadgeBlue = withStyles((theme) => ({
  badge: {
    backgroundColor: "#3f51b5",
    color: "#3f51b5",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      border: "1px solid currentColor",
      content: '""',
    },
  },
}))(Badge);
const Student = (props) => {
  const classes = useStyles();

  return (
    <ListItem style={{ zIndex: 0 }}>
      <ListItemAvatar>
        {props.student.status === "En cours" && (
          <StyledBadgeGreen
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={props.student.firstName + " " + props.student.lastName}
              src={
                process.env.PUBLIC_URL +
                "/assets/students/" +
                props.student.lastName.toUpperCase() +
                "_" +
                props.student.firstName +
                ".jpg"
              }
            />
          </StyledBadgeGreen>
        )}
        {props.student.status === "Absent" && (
          <StyledBadgeRed
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={props.student.firstName + " " + props.student.lastName}
              src={
                process.env.PUBLIC_URL +
                "/assets/students/" +
                props.student.lastName.toUpperCase() +
                "_" +
                props.student.firstName +
                ".jpg"
              }
            />
          </StyledBadgeRed>
        )}
        {props.student.status === "En télétravail" && (
          <StyledBadgeBlue
            overlap="circle"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            variant="dot"
          >
            <Avatar
              alt={props.student.firstName + " " + props.student.lastName}
              src={
                process.env.PUBLIC_URL +
                "/assets/students/" +
                props.student.lastName.toUpperCase() +
                "_" +
                props.student.firstName +
                ".jpg"
              }
            />
          </StyledBadgeBlue>
        )}
      </ListItemAvatar>

      <ListItemText
        primary={props.student.firstName + " " + props.student.lastName}
        secondary={
          <Typography type="body2" className={classes.secondaryText}>
            {props.student.status}
          </Typography>
        }
      />
    </ListItem>
  );
};

export default Student;
