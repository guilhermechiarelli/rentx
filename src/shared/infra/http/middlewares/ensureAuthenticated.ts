import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';

import { AppError } from '../../../errors/AppError';

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    throw new AppError('Token is missing', 401);
  }

  try {
    const { sub: userId } = verify(token, auth.secret) as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new AppError(error, 401);
  }
}
