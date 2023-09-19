import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import cookieParser from 'cookie-parser';
import figlet from 'figlet';

import env from './config/env';
import db from './config/db';
import apiKeyInterceptor from './middlewares/ApiKeyInterceptor';
import { deserializeUser } from './middlewares/Auth';   

import PostRoutes from './routes/PostRoutes';
import AuthRoutes from './routes/AuthRoutes';
import UserRoutes from './routes/UserRoutes';
import FollowRoutes from './routes/FollowRoutes';
import CommentRoutes from './routes/CommentRoutes'

const init = async () => {
    await db.sync();
    figlet("EXPRESS SERVER", (err, data) => {
        console.log("=".repeat(120));
        console.log(data);
        console.log("=".repeat(120));
        console.log("CONNECTION TO DATABASE ESTABLISHED!");
        console.log(`SERVER IS RUNNING AT http://localhost:${env.serverPort}`);
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
    app.use(CommentRoutes);
    
    app.listen(env.serverPort, () => {});
}

init();