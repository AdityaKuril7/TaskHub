import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { authRouter } from "./modules/auth/auth.route.js";
import { ApiError } from "./lib/helperFunction.js";
import { taskRouter } from "./modules/task/task.route.js";
import cors from "cors";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`${req.method} ${req.path} →`, err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: err });
});

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
