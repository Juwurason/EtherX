"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = exports.authMiddleware = void 0;
const passport_1 = __importDefault(require("passport"));
exports.authMiddleware = passport_1.default.authenticate("jwt", { session: false });
const protectRoute = (req, res, next) => {
    (0, exports.authMiddleware)(req, res, next);
};
exports.protectRoute = protectRoute;
