import { Router } from "express";
import { roomController } from "../controller";
import { body } from "express-validator"

const router: Router = Router();

//* 스터디룸 조회 (GET /studyroom)
router.get("/", roomController.getAllStudyroom);

//* 건물별 스터디룸 조회 (GET /studyroom/:building)
router.get("/:building", roomController.getBuilding);

//* 건물별 스터디룸 조회 (GET /studyroom/:building/spec)
router.get("/:building", roomController.getStudyroom);

//* 스터디룸 예약 (POST /studyroom/:building/spec)
router.post("/:building", roomController.createReservation);

export default router;