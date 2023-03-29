import { Router } from "express";
import { userController } from "../controller";
import { body } from "express-validator"

const router: Router = Router();

//* 예약 조회 (GET /user/reservation)
router.get('/reservation', userController.getReservation);

//* 예약 취소 (DELETE /user/reservation)
router.delete('/reservation', userController.cancelReservation);

export default router;