import app from "./server";
// this should be in the entry file
import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();

app.listen(config.port, () => {
  console.log(`hello on http://localhost:${config.port}`);
});
