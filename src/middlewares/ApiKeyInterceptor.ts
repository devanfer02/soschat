import { Request, Response, NextFunction} from 'express';
import env from '../config/env';

class ApiKeyInterceptor {
    constructor(private apiKey: string, private apiKeyName: string) {}

    public validate(req: Request, res: Response, next: NextFunction) {
        const providedApiKey = req.headers[this.apiKeyName];
        if (providedApiKey != this.apiKey) {
            return res.status(403).json({
                message: 'forbidden'
            })
        }

        next();
    }

    get getApiKey() {
        return this.apiKey;
    }

    get getApiKeyName() {
        return this.apiKeyName;
    }
};

const apiKeyInterceptor = new ApiKeyInterceptor(env.apiKey, env.apiKeyName);

export default apiKeyInterceptor;