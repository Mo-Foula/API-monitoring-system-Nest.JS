import * as dotenv from 'dotenv'
dotenv.config()

const { JWT_SECRET: jwtSecret, JWT_EXPIRATION: jwtExpiration } = process.env

export const jwtConstants = {
  secret: jwtSecret,
  expiry: jwtExpiration,
}

export const canPassAuthGuards = ['/auth/login', '/auth/signup']
