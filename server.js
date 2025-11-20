const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// serve public folder
app.use(express.static("public"));

// Root
app.get("/", (req, res) => {
    res.send("Custom Activity Running!");
});

// Return config.json
app.get("/config.json", (req, res) => {
    res.sendFile(path.join(__dirname, "config.json"));
});

// SFMC lifecycle handlers
app.post("/publish", (req, res) => res.json({ status: "published" }));
app.post("/validate", (req, res) => res.json({ status: "validated" }));
app.post("/stop", (req, res) => res.json({ status: "stopped" }));

// Execute (just returns a static response)
app.post("/execute", (req, res) => {
    res.json({
        message: "Execute OK",
        staticValue: "Hello from Onestep!"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
