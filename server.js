const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));  // serve ui.html, ui.js, images, etc.

// ---------------------------------------------
// DYNAMIC CONFIG.JSON — THIS FIXES YOUR ERROR
// ---------------------------------------------
app.get("/config.json", (req, res) => {
  const config = {
    workflowApiVersion: "1.1",
    metaData: {
      icon: "images/icon.svg",
      category: "customer"
    },
    type: "REST",

    lang: {
      "en-US": {
        name: "Simple DIY Activity",
        description: "A test activity that updates a DE with static data."
      }
    },

    arguments: {
      execute: {
        inArguments: [
          { testValue: "HelloFromSFMC" }
        ],
        outArguments: [],
        url: `https://${req.headers.host}/execute`,
        timeout: 10000,
        retryCount: 2,
        retryDelay: 1000,
        concurrentRequests: 5
      }
    },

    configurationArguments: {
      publish: { url: `https://${req.headers.host}/publish` },
      validate: { url: `https://${req.headers.host}/validate` },
      stop: { url: `https://${req.headers.host}/stop` }
    },

    userInterfaces: {
      configInspector: { size: "scm-lg", emptyIframe: true },
      configurationSupportsReadOnlyMode: true
    },

    schema: {
      arguments: {
        execute: {
          outArguments: [
            {
              responseValue: {
                dataType: "Text",
                direction: "out",
                access: "visible"
              }
            }
          ]
        }
      }
    }
  };

  res.json(config);
});

// ---------------------------------------------
// EXECUTE endpoint — static response for now
// ---------------------------------------------
app.post("/execute", (req, res) => {
  console.log("EXECUTE CALLED");

  res.json({
    response: "Execute processed",
    valueReturned: "HelloFromServer"
  });
});

// Other activity lifecycle routes
app.post("/save", (req, res) => res.json({ saved: true }));
app.post("/publish", (req, res) => res.json({ published: true }));
app.post("/validate", (req, res) => res.json({ valid: true }));
app.post("/stop", (req, res) => res.json({ stopped: true }));

// ---------------------------------------------
// SERVER START
// ---------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
