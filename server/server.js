import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/auth.route.js";
import messagesRouter from "./src/routes/messages.route.js";
import usersRouter from "./src/routes/users.route.js";
import { catchErrors, notFound } from "./src/middlewares/errors.js";

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes config
app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});
app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/users', usersRouter);

// errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
