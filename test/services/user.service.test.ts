import {UserService} from "../../src/services/user.service";
import mongoose from "mongoose";
import {UserModel} from "../../src/models/User";
import IUser from "../../src/models/user.interface";
import {CustomResponse} from "../../src/utils/IResponseBody";
import {UserValidation} from "../../src/utils/validation/UserValidation";
import {NotFoundError} from "routing-controllers";

describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = UserService.getInstance();
    });

    it('should return user data successfully', async () => {
        // Arrange
        const userId = '1234567890';
        const user = {
            _id: userId,
            name: 'John Doe',
            email: 'john.doe@example.com'
        };

        jest.spyOn(mongoose.Types.ObjectId, 'isValid').mockReturnValue(true);
        jest.spyOn(UserModel, 'findById').mockReturnValue({
            lean: jest.fn().mockResolvedValue(user)
        } as any);

        // Act
        const response = await userService.getUserById(userId);

        // Assert
        expect(response).toHaveProperty('status', 'Success');
        expect(response).toHaveProperty('message', 'User data retrieved successfully');
        expect(response).toHaveProperty('data');
        expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(userId);
        expect(UserModel.findById).toHaveBeenCalledWith(userId);

        // Additional assertions based on the expected structure
        expect(response.data).toHaveProperty('id', userId);
        expect(response.data).toHaveProperty('name', user.name);
        expect(response.data).toHaveProperty('email', user.email);
    });
});



describe('UserService', () => {
    let userService: UserService;

    beforeAll(() => {
        userService = UserService.getInstance();
    });

    it('should add a user successfully', async () => {
        // Arrange
        const user:UserValidation = {
            username: "John",
            name: 'John Doe',
            email: 'johndoe@example.com'
        };

        const expectedResult = {
            status: 'Success',
            message: 'User added successfully',
            data: {
                name: 'John Doe',
                email: 'johndoe@example.com',
                id: '1234567890'
            }
        };

        jest.spyOn(UserModel, 'create').mockResolvedValueOnce(expectedResult.data as any);

        // Act
        const result = await userService.addUser(user);

        // Assert
        expect(result).toHaveProperty('status', 'Success');
        expect(result).toHaveProperty('message', 'User added successfully');
        expect(result).toHaveProperty('data');
        expect(UserModel.create).toHaveBeenCalledWith(user);

        // Additional assertions based on the expected structure
        expect(result.data).toHaveProperty('id', expectedResult.data.id);
        expect(result.data).toHaveProperty('name', expectedResult.data.name);
        expect(result.data).toHaveProperty('email', expectedResult.data.email);
    });
});




describe('UserService', () => {
    let userService: UserService;

    beforeEach(() => {
        userService = UserService.getInstance();
    });

    it('Should handle invalid userId during delete operation', async () => {
        const invalidUserId = 'invalidUserId';

        const deleteSpy = jest.spyOn(UserModel, 'findByIdAndDelete');

        await expect(userService.deleteUser(invalidUserId)).rejects.toThrow(NotFoundError);

        expect(deleteSpy).not.toHaveBeenCalled();
    });
});