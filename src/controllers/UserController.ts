import {
  JsonController,
  Param,
  Get,
  NotFoundError,
  UseBefore,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  UseAfter
} from 'routing-controllers';
import { UserService } from '../services/user.service';
import { rateLimitMiddleware } from '../middlewares/rateLimitMiddleware';
import {UserValidation} from "../utils/validation/UserValidation";
import {logRequests} from "../middlewares/logRequests";

@JsonController('users')
@UseBefore(rateLimitMiddleware)
@UseBefore(logRequests)
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  @Get('/')
  async getAllUser() {
    return this.userService.getAllUsers();
  }

  @Post('/')
  @HttpCode(201)
  async addNewUser(@Body({ validate: true }) user: UserValidation) {
    return this.userService.addUser(user);
  }

  @Patch('/:userId')
  @HttpCode(202)
  async updateUser(@Body({ validate: true }) user: UserValidation, @Param('userId') userId: string) {
    return this.userService.updateUser(userId, user);
  }

  @Delete('/:userId')
  @HttpCode(204)
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.getUserById(userId);
  }
}
