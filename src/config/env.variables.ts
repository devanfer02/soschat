import { config } from 'dotenv';

config();

const throwUndefinedEnv = (message: string) => {
    throw new Error('env: ' + message);
};

const env = {
    apiKey      : process.env.API_KEY ? process.env.API_KEY : throwUndefinedEnv('api_key is undefined'),
    apiKeyName  : process.env.API_KEY_NAME ? process.env.API_KEY_NAME : throwUndefinedEnv('api_key_name is undefined'),
    serverPort  : process.env.SERVER_PORT ? process.env.SERVER_PORT : throwUndefinedEnv('server_port is undefined'),
    dbName      : process.env.DB_NAME ? process.env.DB_NAME : throwUndefinedEnv('db_name is undfined'),
    dbUsername  : process.env.DB_USERNAME ? process.env.DB_USERNAME : throwUndefinedEnv('db_username is undefined'),
    dbPassword  : process.env.DB_PASSWORD ? process.env.DB_PASSWORD : '',
    dbHost      : process.env.DB_HOST ? process.env.DB_HOST : throwUndefinedEnv('db_host is undefined'),
    saltRounds  : process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND!) : throwUndefinedEnv('salt_round is undefined'),
    sessionKey  : process.env.SESSION_KEY ? process.env.SESSION_KEY : throwUndefinedEnv('session_key is undefined'),
    jwtKey      : process.env.JWT_KEY ? process.env.JWT_KEY : throwUndefinedEnv('jwt_key is undefined'),
};

export default env;