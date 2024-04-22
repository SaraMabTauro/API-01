"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const CreateUser_1 = require("./controllers/CreateUser");
const router = express_1.default.Router();
exports.userRouter = router;
router.post('/user', CreateUser_1.createUserController);
