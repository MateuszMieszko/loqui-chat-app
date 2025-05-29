const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const authRouter = require('./src/routes/auth.route');
const messagesRouter = require('./src/routes/messages.route');
const usersRouter = require('./src/routes/users.route');
const { catchErrors, notFound } = require('./src/middlewares/errors');

dotenv.config();
const PORT = process.env.SERVER_PORT;

const app = express();

app.use(cors());
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
