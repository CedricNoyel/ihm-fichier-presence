import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Student from "./components/Student/Student";
import Filters from "./components/Filters/Filters";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { Paper, Toolbar, Grid, Menu, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { studentList } from "./storage/StudentList";
import EmailIcon from "@material-ui/icons/Email";
import socketIOClient from "socket.io-client";
import { Launcher } from "react-chat-window";

const socket = socketIOClient("192.168.1.28:3001");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(2),
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  mailLink: {
    textDecoration: "none",
    color: "#000000",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Album() {
  const classes = useStyles();

  // CHAT HANDLER
  const [chatOpen, setChatOpen] = useState(false);
  const [chat, setChat] = useState({ messageList: [] });
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    socket.on("chat-message", (msg) => {
      setMessageCount((prevCount) => prevCount + 1);
      let newMsg = msg;
      msg.author = "them";
      setChat((prevState) => ({
        messageList: [...prevState.messageList, newMsg],
      }));
    });
  }, []);

  const sendChatMessage = (data) => {
    let newData = data;
    console.log("SNEDMEsSAGE");
    socket.emit("chat-message", newData);
    setChat((prevState) => ({
      messageList: [...prevState.messageList, newData],
    }));
  };

  const handleChatClick = () => {
    setMessageCount(0);
    setChatOpen(!chatOpen);
  };

  /// END CHAT

  const filterList = [
    { filter: "tous", filterName: "Classe entière" },
    { filter: "front", filterName: "Front" },
    { filter: "back", filterName: "Back" },
  ];
  const [selectedFilter, setSelectedFilter] = React.useState(
    filterList[0].filter
  );

  let groupStudent =
    selectedFilter !== "tous"
      ? studentList.filter((e) => e.classGroup === selectedFilter)
      : studentList;
  const studentsInClass = groupStudent
    .filter((e) => e.status !== "Absent")
    .sort((a, b) => a.lastName > b.lastName);
  const studentsNotInClass = groupStudent
    .filter((e) => e.status === "Absent")
    .sort((a, b) => a.lastName > b.lastName);

  const nbStudents = groupStudent.length;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(chat.messageList);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" style={{ zIndex: 998 }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Etudiants FIL A3
          </Typography>
          <div>
            <Button
              variant="contained"
              onClick={handleMenu}
              startIcon={<EmailIcon />}
            >
              Contacter les étudiants
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <a
                href={
                  "mailto:" +
                  studentsInClass.concat(studentsNotInClass).map((e) => e.email)
                }
                className={classes.mailLink}
              >
                <MenuItem onClick={handleClose}>
                  Contacter tous les étudiants
                </MenuItem>
              </a>
              <a
                href={"mailto:" + studentsInClass.map((e) => e.email)}
                className={classes.mailLink}
              >
                <MenuItem onClick={handleClose} className={classes.mailLink}>
                  Contacter uniquement les étudiants présents
                </MenuItem>
              </a>
              <a
                href={"mailto:" + studentsNotInClass.map((e) => e.email)}
                className={classes.mailLink}
              >
                <MenuItem onClick={handleClose} className={classes.mailLink}>
                  Contacter uniquement les étudiants absents
                </MenuItem>
              </a>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <main style={{ zIndex: 0 }}>
        <Container className={classes.root} maxWidth="xl">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Grid container>
                  <Grid item xs={12}>
                    <Filters
                      filterList={filterList}
                      selectedFilter={selectedFilter}
                      onChange={(e) => setSelectedFilter(e)}
                    ></Filters>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={9}>
              <Paper className={classes.paper}>
                <Grid item xs={12}>
                  <h2>
                    Présents :{" "}
                    {groupStudent.filter((e) => e.status !== "Absent").length} /{" "}
                    {nbStudents}
                  </h2>
                </Grid>
                <Grid container>
                  {studentsInClass.length !== 0 ? (
                    studentsInClass.map((e, idx) => (
                      <Grid item xs={12} sm={6} md={4}>
                        <Student key={e.id} student={e}></Student>
                      </Grid>
                    ))
                  ) : (
                    <h2>Aucun élève présent</h2>
                  )}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={3}>
              <Paper className={classes.paper}>
                {studentsNotInClass.length !== 0 && <h2>Absents</h2>}
                {studentsNotInClass.length !== 0 ? (
                  studentsNotInClass.map((e) => (
                    <Student key={e.id} student={e}></Student>
                  ))
                ) : (
                  <h2>Pas d'absent</h2>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <div style={{ zIndex: 999 }}>
          <Launcher
            agentProfile={{
              teamName: "Chat FIL",
              imageUrl:
                "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
            }}
            onMessageWasSent={(e) => sendChatMessage(e)}
            messageList={chat.messageList}
            newMessagesCount={messageCount}
            handleClick={(e) => handleChatClick()}
            isOpen={chatOpen}
            mute
            showEmoji
          />
        </div>
      </main>
    </React.Fragment>
  );
}
