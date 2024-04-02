import { Request, Response } from "express";
import { userServices } from "./user.service";

const createAdmin = async (request: Request, response: Response) => {
    try {
        const result = await userServices.createAdmin(request.body);
        response.status(200).json({
            success: true,
            message: "Admin Created Successfully!",
            data: result,
        });
    } catch (error: any) {
        response.status(500).json({
            success: false,
            message: error?.name || "Something Went Wrong!",
            error: error,
        });
    }

}

export const UserControllers = {
    createAdmin
}