import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import cookieParser from 'cookie-parser';

import env from './config/env';
import db from './config/db';
import apiKeyInterceptor from './middlewares/ApiKeyInterceptor';

import PostRoutes from './routes/PostRoutes';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import FollowRoutes from './routes/FollowRoutes'
import { deserializeUser } from './middlewares/Auth';

db.sync().then(() => {
    console.log("connection to database established!")
});

const SessionStore   = SequelizeStore(session.Store);
const sessionStorage = new SessionStore({
    db
});
const app = express();

app.use(session({
    secret: env.sessionKey,
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: {
        secure: 'auto',
    }
}));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(apiKeyInterceptor.validate.bind(apiKeyInterceptor));
app.use(AuthRoutes);
app.use(deserializeUser);
app.use(PostRoutes);
app.use(UserRoutes);
app.use(FollowRoutes);

app.listen( env.serverPort, () => {
    console.log(`server is running at http://localhost:${env.serverPort}`);
})