import express from 'express';
import {GameController} from "../controllers/GameController";

const router = express.Router()
const gameController: GameController = new GameController();

router.get('/', gameController.getStatus.bind(gameController));

export = router;
