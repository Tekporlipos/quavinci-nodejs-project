import express, { Express, Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { useExpressServer } from 'routing-controllers';
import { setupSwagger } from './swagger';
import {UserController} from "./src/controllers/UserController"; // Import the setupSwagger function
import "./src/config/db"
const app: Express = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

useExpressServer(app, {
  controllers: [UserController],
  routePrefix:"/api/v1/"
});

setupSwagger(app);

export = app;
