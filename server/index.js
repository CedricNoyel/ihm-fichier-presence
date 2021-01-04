var app = require("express")();
var http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

let chat = [
  {
    author: "TEST",
    type: "text",
    data: "Message d'accueil",
    datetime: new Date(),
  },
];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat-message", function (data) {
    console.log(data);
    socket.broadcast.emit("chat-message", data);
  });
});

http.listen(3001, () => {
  console.log("listening on *:3001");
});
