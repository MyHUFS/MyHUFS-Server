import { Router } from "express";
import userRouter from "./userRouter";
import roomRouter from "./roomRouter";

const router: Router = Router();

router.use("/user", userRouter);
router.use("/studyroom", roomRouter);

export default router;