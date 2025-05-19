import express from "express";
import dotenv from "dotenv";
import usersRouter from "./src/routes/users.route.js";
import { catchErrors, notFound } from "./src/middlewares/errors.js";
import authRouter from "./src/routes/auth.route.js";

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes config
app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});
app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

// errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
