import { config } from 'dotenv';

config();

const throwUndefinedEnv = (message: string) => {
    throw new Error('env: ' + message);
};

interface Env {
    apiKey       : string
    apiKeyName   : string
    serverPort   : number
    dbName       : string
    dbUsername   : string
    dbPassword   : string
    dbHost       : string
    dbDialect    : string
    saltRounds   : number
    sessionKey   : string
    jwtToken     : string
    refreshToken : string
};

const env: Env = {
    apiKey      : process.env.API_KEY ? process.env.API_KEY : throwUndefinedEnv('API_KEY is undefined'),
    apiKeyName  : process.env.API_KEY_NAME ? process.env.API_KEY_NAME : throwUndefinedEnv('API_KEY_NAME is undefined'),
    serverPort  : process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : throwUndefinedEnv('SERVER_PORT is undefined'),
    dbName      : process.env.DB_NAME ? process.env.DB_NAME : throwUndefinedEnv('DB_NAME is undfined'),
    dbUsername  : process.env.DB_USERNAME ? process.env.DB_USERNAME : throwUndefinedEnv('DB_USERNAME is undefined'),
    dbPassword  : process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
    dbHost      : process.env.DB_HOST ? process.env.DB_HOST : throwUndefinedEnv('DB_HOST is undefined'),
    dbDialect   : process.env.DB_DIALECT ? process.env.DB_DIALECT : throwUndefinedEnv('DB_DIALECT is undefined'),
    saltRounds  : process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND!) : throwUndefinedEnv('SALT_ROUND is undefined'),
    sessionKey  : process.env.SESSION_KEY ? process.env.SESSION_KEY : throwUndefinedEnv('SESSION_KEY is undefined'),
    jwtToken    : process.env.JWT_TOKEN ? process.env.JWT_TOKEN : throwUndefinedEnv('JWT_TOKEN is undefined'),
    refreshToken: process.env.REFRESH_TOKEN ? process.env.REFRESH_TOKEN : throwUndefinedEnv('REFRESH_TOKEN is undefined')
};

export default env;