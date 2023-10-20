import { Request, Response } from "express";


export const getAll = async (req: Request, res: Response) => {
  res.status(200).json({workin: true});
}