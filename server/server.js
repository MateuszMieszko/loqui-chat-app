import express from "express";
import dotenv from "dotenv";
import { query } from "./src/utils/databaseQuery.js";
import usersRouter from "./src/routes/users.route.js";
import { catchErrors, notFound } from "./src/middlewares/errors.js";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import authRouter from "./src/routes/auth.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();

app.set('view engine', 'pug');
app.set('views', join(__dirname, '/src/views'));
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
