"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// app.ts
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const routing_controllers_1 = require("routing-controllers"); // Import useExpressServer
const UserController_1 = require("./src/controllers/UserController"); // Import UserController
const app = (0, express_1.default)();
// view engine setup
app.set('views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Use the useExpressServer function to register routing controllers
(0, routing_controllers_1.useExpressServer)(app, {
    controllers: [UserController_1.UserController], // Add UserController to the controllers array
});
// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app;
