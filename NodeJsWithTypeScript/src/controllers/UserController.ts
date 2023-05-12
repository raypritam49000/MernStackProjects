import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import ApiResponse from '../payload/ApiResponse';

class UserController {

    static getAllUsers = async (req: Request, res: Response): Promise<void> => {
        try {
            const users: IUser[] = await User.find();

            if (users) {
                const apiResponse: ApiResponse = {
                    isSuccess: true,
                    status: 'success',
                    statusCode: 200,
                    message: 'Users retrieved successfully',
                    data: users
                };
                res.status(200).json(apiResponse);
            }
            else {
                const apiResponse: ApiResponse = {
                    isSuccess: true,
                    status: 'success',
                    statusCode: 404,
                    message: 'Users Details List',
                    data: users
                };
                res.status(404).json(apiResponse);
            }

        } catch (error) {
            const apiResponse: ApiResponse = {
                isSuccess: false,
                status: 'error',
                statusCode: 500,
                message: 'Interval Server Error'
            };
            res.status(500).json(apiResponse);
        }

    }

    static createUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const newUser: IUser = req.body;
            const createUser: IUser = await User.create(newUser);
            const apiResponse: ApiResponse = {
                isSuccess: true,
                status: 'success',
                statusCode: 200,
                message: 'User has been created successfully',
                data: createUser
            };
            res.status(200).json(apiResponse);
        } catch (error) {
            const apiResponse: ApiResponse = {
                isSuccess: false,
                status: 'error',
                statusCode: 500,
                message: error.message
            };
            res.status(500).json(apiResponse);
        }
    }

}

export default UserController;