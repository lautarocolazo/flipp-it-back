import { Router } from "express";
import { prisma } from "../db.js";
import { hashSync, compareSync } from "bcrypt"; // This is to hash and verify passwords
import jwt from "jsonwebtoken"; // This module that I installed is to get JWT for auth
import { JWT_SECRET } from "../secrets.js";

const router = Router();

// Create new user
router.post("/signup", async (req, res) => {
	const { username, email, password } = req.body;

	let user = await prisma.user.findFirst({ where: { email } });

	if (user) {
		throw Error("User already exists.");
	}

	user = await prisma.user.create({
		data: {
			username,
			email,
			password: hashSync(password, 10),
		},
	});

	res.json(user);
});

// Login user
router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	let user = await prisma.user.findFirst({ where: { email } });

	if (!user) {
		throw Error("User does not exist.");
	}

	if (!compareSync(password, user.password)) {
		throw Error("Incorrect password");
	}

	const token = jwt.sign(
		{
			userId: user.id,
		},
		JWT_SECRET,
	);

	res.json({
		user: {
			id: user.id,
			username: user.username,
		},
		token,
	});
});

export default router;
