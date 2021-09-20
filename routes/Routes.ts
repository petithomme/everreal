import express from 'express';
import {GameController} from "../controllers/GameController";

const router = express.Router()
const gameController: GameController = new GameController();

router.get('/', gameController.getStatus.bind(gameController));
router.get('/startNewGame', gameController.startNewGame.bind(gameController));
router.get('/autoPlay', gameController.autoPlay.bind(gameController));
router.get('/fullAutoPlay', gameController.fullAutoPlay.bind(gameController));
router.get('/play', gameController.play.bind(gameController));

export = router;
