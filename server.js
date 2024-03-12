const express = require("express");
const cors = require("cors");
const Replicate = require("replicate");
const dotenv = require("dotenv");
// rest of your code

dotenv.config();

const app = express();
app.use(cors());

app.get("/api/generate", async (req, res) => {
  const imageUrl = req.query.imageUrl;
  const apiToken = req.query.apiToken;

  const replicate = new Replicate({
    auth: apiToken,
    userAgent: "https://www.npmjs.com/package/create-replicate",
  });

  const model =
    "salesforce/blip:2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746";
  const input = {
    task: "image_captioning",
    image: imageUrl,
  };

  try {
    const output = await replicate.run(model, { input });
    res.json(output);
  } catch (error) {
    res.status(500).json({ error: "Error running the model" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
