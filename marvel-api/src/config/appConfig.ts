import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    port: process.env.PORT,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    api: process.env.API,
    jwtSecret: process.env.JWT_SECRET,
    env: process.env.NODE_ENV,
}));
