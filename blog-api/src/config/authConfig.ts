import { auth } from 'express-oauth2-jwt-bearer';

export const authMiddleware = auth({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE,
});
