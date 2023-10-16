import { config } from 'dotenv';

config();

const throwUndefinedEnv = (message: string) => {
    throw new Error('env: ' + message);
};

interface Env {
    apiKey              : string
    apiKeyName          : string
    serverPort          : number
    dbName              : string
    dbUsername          : string
    dbPassword          : string
    dbHost              : string
    dbDialect           : string
    dbPort              : number
    saltRounds          : number
    sessionKey          : string
    jwtToken            : string
    refreshToken        : string
    firebaseKey         : string
    authDomain          : string 
    projectId           : string 
    storageBucket       : string 
    messagingSenderId   : string
    appId               : string
    measurementId       : string
};

const env: Env = {
    apiKey              : process.env.API_KEY ? process.env.API_KEY : throwUndefinedEnv('API_KEY is undefined'),
    apiKeyName          : process.env.API_KEY_NAME ? process.env.API_KEY_NAME : throwUndefinedEnv('API_KEY_NAME is undefined'),
    serverPort          : process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : throwUndefinedEnv('SERVER_PORT is undefined'),
    dbName              : process.env.DB_NAME ? process.env.DB_NAME : throwUndefinedEnv('DB_NAME is undfined'),
    dbUsername          : process.env.DB_USERNAME ? process.env.DB_USERNAME : throwUndefinedEnv('DB_USERNAME is undefined'),
    dbPassword          : process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
    dbHost              : process.env.DB_HOST ? process.env.DB_HOST : throwUndefinedEnv('DB_HOST is undefined'),
    dbDialect           : process.env.DB_DIALECT ? process.env.DB_DIALECT : throwUndefinedEnv('DB_DIALECT is undefined'),
    dbPort              : process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    saltRounds          : process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND!) : throwUndefinedEnv('SALT_ROUND is undefined'),
    sessionKey          : process.env.SESSION_KEY ? process.env.SESSION_KEY : throwUndefinedEnv('SESSION_KEY is undefined'),
    jwtToken            : process.env.JWT_TOKEN ? process.env.JWT_TOKEN : throwUndefinedEnv('JWT_TOKEN is undefined'),
    refreshToken        : process.env.REFRESH_TOKEN ? process.env.REFRESH_TOKEN : throwUndefinedEnv('REFRESH_TOKEN is undefined'),
    firebaseKey         : process.env.FIREBASE_API_KEY ? process.env.FIREBASE_API_KEY : throwUndefinedEnv('FIREBASE_API_KEY is undefined'),
    authDomain          : process.env.AUTH_DOMAIN ? process.env.AUTH_DOMAIN : throwUndefinedEnv('AUTH_DOMAIN is undefined'),
    projectId           : process.env.PROJECT_ID ? process.env.PROJECT_ID : throwUndefinedEnv('PROJECT_ID is undefined'),
    storageBucket       : process.env.STORAGE_BUCKET ? process.env.STORAGE_BUCKET : throwUndefinedEnv('STORAGE_BUCKET is undefined'),
    messagingSenderId   : process.env.MESSAGING_SENDER_ID ? process.env.MESSAGING_SENDER_ID : throwUndefinedEnv('MESSAGING_SENDER_ID is undefined'),
    appId               : process.env.APP_ID ? process.env.APP_ID : throwUndefinedEnv('APP_ID is undefined'),
    measurementId       : process.env.MEASUREMENT_ID ? process.env.MEASUREMENT_ID : throwUndefinedEnv('MEASUREMENT_ID is undefined')
};

export default env;