import { Request, Response } from "express";
import { IUser } from "./User";

export type Context =() => {req: Request, res: Response}