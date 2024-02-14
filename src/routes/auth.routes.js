import { Router } from "express";
import { prisma } from "../db.js";
import { hashSync } from "bcrypt";

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

export default router;
