import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import { User } from "@prisma/client";
import prisma from "./prisma";

export const generateUniqueUsername = async (
  baseName: string
): Promise<string> => {
  let username = baseName.replace(/\s+/g, "_").toLowerCase();
  let counter = 1;
  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${baseName}_${counter++}`;
  }
  return username;
};

export const setJWTCookie = async (
  res: Response,
  user: User
): Promise<void> => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3600000,
  });
};

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).send("Unauthorized");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    console.log("Decoded JWT:", decoded); // Debugging line

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    req.user = user;

    res.json(decoded);
  } catch (err) {
    res.status(403).send("Invalid token");
  }
};
