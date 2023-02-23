import { User } from "src/entity/user.entity";
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
    user?:  User;
}