import { Request, Response } from 'express';
import { AdminServices } from './admin.service';
import pick from '../../shared/pick';
import { adminFilterableFields } from './admin.constant';

const getAllAdmin = async (request: Request, response: Response) => {
    try {
        const filter = pick(request.query, adminFilterableFields);
        const options = pick(request.query, ['page', 'limit', 'sortBy', 'sortOrder']);
        const result = await AdminServices.getAllAdminFromDB(filter, options);
        response.status(200).json({
            success: true,
            message: "All Admin Data Retrieved Successfully!",
            meta: result.meta,
            data: result.data,
        });
    } catch (error: any) {
        response.status(500).json({
            success: false,
            message: error?.name || "Something Went Wrong!",
            error: error,
        });
    }
}

const getAdminByID = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const result = await AdminServices.getAdminByIDFromDB(id);
        response.status(200).json({
            success: true,
            message: "Admin Data Retrieved By ID!",
            data: result,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error?.name || "Something Went Wrong!",
            error: error,
        });
    }
}

const updateAdminByID = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const result = await AdminServices.updateAdminByIDFromDB(id, request.body);
        response.status(200).json({
            success: true,
            message: "Admin Data Updated Successfully!",
            data: result,
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error?.name || "Something Went Wrong!",
            error: error,
        });
    }
}

const deleteFromDB = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const result = await AdminServices.deleteFromDB(id);

        response.status(200).json({
            success: true,
            message: "Admin data deleted!",
            data: result
        });
    } catch (error) {
        response.status(500).json({
            success: false,
            message: error?.name || "Something Went Wrong!",
            error: error,
        });
    }
}

export const AdminControllers = {
    getAllAdmin,
    getAdminByID,
    updateAdminByID,
    deleteFromDB
}