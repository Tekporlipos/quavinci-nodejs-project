import {JsonController, Param, Get, NotFoundError, UseBefore, Post, Body, Patch, Delete} from 'routing-controllers';
import { validate } from 'class-validator';
import { UserService } from '../services/user.service';
import { rateLimitMiddleware } from '../middlewares/rateLimitMiddleware';
import logger from '../utils/logger';
import IUser from "../models/user.interface";

@JsonController('users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  @Get('/')
  @UseBefore(rateLimitMiddleware)
  async getAllUser() {
    return this.userService.getAllUsers()
  }

  @Post('/')
  @UseBefore(rateLimitMiddleware)
  async addNewUser(@Body() user:IUser) {
    return this.userService.addUser(user)
  }


  @Patch('/:userId')
  @UseBefore(rateLimitMiddleware)
  async updateUser(@Body() user:IUser, @Param('userId') userId: string) {
    return this.userService.updateUser(userId,user)
  }


  @Delete('/:userId')
  @UseBefore(rateLimitMiddleware)
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId)
  }



  @Get('/:userId')
  @UseBefore(rateLimitMiddleware)
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUserById(userId)
  }
}
