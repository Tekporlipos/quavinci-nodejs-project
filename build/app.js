"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers");
const swagger_1 = require("./swagger");
const UserController_1 = require("./src/controllers/UserController"); // Import the setupSwagger function
require("./src/config/db");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [UserController_1.UserController],
    routePrefix: "/api/v1/"
});
(0, swagger_1.setupSwagger)(app);
module.exports = app;
