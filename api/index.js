import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = 8000;
const HIBP_API_KEY = process.env.HIBP_API_KEY;

app.use(cors());
app.use(express.json());

app.use("/", (req, res, next) => {
  res.json({
    status: "success",
    message: "You have reach the end point",
  });
});

app.post("/check-email", async (req, res) => {
  //   console.log("Received request to /check-email");
  const email = req.body.email;

  try {
    const response = await axios.get(
      `https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`,
      {
        headers: {
          "hibp-api-key": HIBP_API_KEY,
          // 'user-agent': 'YourAppName'  // replace 'YourAppName' with the name of your app
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: "Error retrieving data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
