import bcrypt from "bcryptjs";
import { prisma } from "../../lib/db.js";
import type { IAuth } from "../../types/auth.js";
import { generateToken } from "../../lib/jwt.js";
import { ApiError } from "../../lib/helperFunction.js";

export class AuthService {
  async signup(data: IAuth) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const isUserExsist = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (isUserExsist) throw new ApiError("User already exsist !", 400);
    return await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }
  async login(data: IAuth) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      throw new ApiError("Invalid username or password please try again!", 400);

    const isPassCorrect = await bcrypt.compare(password, user.password);

    if (!isPassCorrect)
      throw new ApiError("Invalid username or password please try again!", 400);

    const token = generateToken({ id: user.id, email: user.email });

    return token;
  }
}

export default new AuthService();
