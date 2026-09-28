import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
