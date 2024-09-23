import express from "express";
import { homePage, processSignUpData } from "../controllers/sign-up.controller";

export const router = express.Router();

router.get("/", homePage);

router.post("/api/signup", processSignUpData);
