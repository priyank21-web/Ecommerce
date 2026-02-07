import { Request } from 'express';

export interface AuthPayload {
  sub: string;
  tenantId: string;
  role: string;
}

export interface RequestWithUser extends Request {
  user: AuthPayload;
}
