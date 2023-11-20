import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config';
const app = express();

// cors configuration
app.use(cors())

// Import All Routes
import { router as userRouter } from './user/router';
import { router as authRouter } from './authentication/router';
import { router as feedRouter } from './feed/router';

// Body-Parser configuration
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Register Routes
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/feed', feedRouter);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Wolibo assignment application. Please read README.md file to get started.');
});

app.listen(config.PORT, () => console.log(`Server running at port ${config.PORT}`));

export default app;