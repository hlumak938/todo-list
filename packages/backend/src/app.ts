import express, { Express } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';

import './config/jwtStrategy';
import AppRouter from './routes';

const port = process.env.PORT || 3030;
const app: Express = express();
const router = new AppRouter(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	}),
);
app.use(passport.initialize());

router.init();

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
