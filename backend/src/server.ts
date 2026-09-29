import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import dotenv from "dotenv";
import { prisma } from "./lib/db.js";
import { authRouter } from "./modules/auth/auth.route.js";
import { ApiError } from "./lib/helperFunction.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});
app.use("/api/auth", authRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`${req.method} ${req.path} →`, err);
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error !" });
});

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});
