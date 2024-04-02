import { Admin, Prisma, UserStatus } from '@prisma/client';
import { adminSearchableFields } from './admin.constant';
import { paginationHelper } from '../../helper/paginationHelper';
import prisma from '../../shared/prisma';

const getAllAdminFromDB = async (params: any, options: any) => {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = params;
    const andCondition: Prisma.AdminWhereInput[] = [];

    console.log(filterData)
    if (searchTerm) {
        andCondition.push({
            OR: adminSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    };

    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key],
                    mode: 'insensitive'
                }
            }))
        });
    }

    const whereConditions: Prisma.AdminWhereInput = {AND: andCondition}

    const data = await prisma.admin.findMany({
        where: whereConditions,
        skip: skip,
        take: limit,
        orderBy: (sortBy && sortOrder) ? {
            [sortBy]: sortOrder
        } : {
            createdAt: 'desc'
        }
    });

    return {
        meta: {
            page: page,
            limit: limit,
            count: data.length
        },
        data: data
    };
}

const getAdminByIDFromDB = async (id: any) => {
    const data = await prisma.admin.findFirst({
        where: {
            id
        }
    });
    return data;
}

const updateAdminByIDFromDB = async (id: string, data: Partial<Admin>) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    })
    const result = await prisma.admin.update({
        where: {
            id
        },
        data
    });
    return result;
}

const deleteFromDB = async (id: string) => {

    await prisma.admin.findUniqueOrThrow({
        where: {
            id
        }
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.delete({
            where: {
                id
            }
        });

        await transactionClient.user.delete({
            where: {
                email: adminDeletedData.email
            }
        });

        return adminDeletedData;
    });

    return result;
}

const softDeleteFromDB = async (id: string) => {
    await prisma.admin.findUniqueOrThrow({
        where: {
            id,
            isDeleted: false
        }
    });

    const result = await prisma.$transaction(async (transactionClient) => {
        const adminDeletedData = await transactionClient.admin.update({
            where: {
                id
            },
            data: {
                isDeleted: true
            }
        });

        await transactionClient.user.update({
            where: {
                email: adminDeletedData.email
            },
            data: {
                status: UserStatus.BLOCKED
            }
        });

        return adminDeletedData;
    });

    return result;
}


export const AdminServices = {
    getAllAdminFromDB,
    getAdminByIDFromDB,
    updateAdminByIDFromDB,
    deleteFromDB,
    softDeleteFromDB
}