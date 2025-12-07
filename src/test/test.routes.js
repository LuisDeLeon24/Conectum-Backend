import { Router } from "express";

import { getCountries } from "./test.controller.js";

const router = Router();

router.get("/countries", getCountries);

export default router;