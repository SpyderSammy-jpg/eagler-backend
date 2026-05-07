const express = require("express");
const cors = require("cors");
const app = express();
const servers = {};

app.use(cors());
app.use(express.json());

app.get("/servers", (req, res) => {
  res.json(Object.values(servers));
});

app.post("/servers/create", (req, res) => {
  const { name, version, motdTitle, motdFooter, motdTheme } = req.body;
  const id = Date.now().toString();
  servers[id] = {
    id,
    name,
    version,
    motdTitle,
    motdFooter,
    motdTheme,
    status: "stopped",
    console: []
  };
  res.json(servers[id]);
});

app.post("/servers/:id/start", (req, res) => {
  const server = servers[req.params.id];
  server.status = "running";
  server.console.push("[SYSTEM] Server started");
  res.json(server);
});

app.post("/servers/:id/stop", (req, res) => {
  const server = servers[req.params.id];
  server.status = "stopped";
  server.console.push("[SYSTEM] Server stopped");
  res.json(server);
});

app.post("/servers/:id/command", (req, res) => {
  const server = servers[req.params.id];
  const { command } = req.body;
  server.console.push("> " + command);
  res.json({ ok: true });
});

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(process.env.PORT || 3000);
