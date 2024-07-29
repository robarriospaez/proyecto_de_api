import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    if (error.code === "P2002" && error.meta.target.includes("email")) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token });
};