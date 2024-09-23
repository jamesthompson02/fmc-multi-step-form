import { Request, Response } from "express";

export const homePage = (req: Request, res: Response) => {
  res.status(200).send(`<h1>Home Page</h1>`);
};

export const processSignUpData = (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "Form data received." });
  } catch (err: any) {
    res.status(400).json({ err });
  }
};
