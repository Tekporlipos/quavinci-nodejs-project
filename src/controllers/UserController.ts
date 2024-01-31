import { JsonController, Param, Get, NotFoundError, UseBefore } from 'routing-controllers';
import { validate } from 'class-validator';
import UserService from '../services/user.service';
import { rateLimitMiddleware } from '../middlewares/rateLimitMiddleware';
import logger from '../utils/logger';

@JsonController('/api/users')
export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = UserService.getInstance();
  }

  @Get('/:userId')
  @UseBefore(rateLimitMiddleware)
  async getUser(@Param('userId') userId: string) {
    try {
      // Validate userId
      const errors = await validate({ userId });
      if (errors.length > 0) {
        throw new NotFoundError('User not found');
      }

      // Retrieve user from the database using the singleton instance of the service
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      // Log request and response
      logger.info(`GET /api/users/${userId}`);
      logger.info('Response:', user);

      return user;
    } catch (error: any) { // Specify 'any' or 'Error' as the type
      // Log errors
      logger.error('Error:', error.message);

      // Return consistent error response
      throw error;
    }
  }
}
