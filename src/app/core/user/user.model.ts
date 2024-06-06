import {Condominium} from '../../modules/condominium/condominium.types';
import {Permission, Role} from '../../app.types';
import {Unit} from '../../modules/unit/unit.types';

export interface User
{
    id: string;
    name: string;
    email: string;
    document: string;
    phone: string;
    blocked: boolean;
}

export interface UserNodePaginate
{
    items: UserNode[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}


export interface UserPermissions
{
    id?: number;
    permission?: Permission;
}

export interface UserNode
{
    id?: number;
    name?: string;
    email?: string;
    enterprise_id?: string;
    password?: string;
    is_admin?: number;
    role_id?: number;
    status?: number;
    document?: string;
    signature?: string;
    phone?: string;
    photo?: string;
    reset_token?: string;
    remote_id?: number;
    occupation?: UserOccupation;
    units?: Unit[];
    role?: Role;
    user_permissions?: UserPermissions[];
    contacts?: UserContact[];
    enterprise?: {
        id?: number;
        name?: string;
    }
    condominium_active?: {
        id: number;
        condominium_id: number;
        user_id: number;
        active: number;
        is_supervisor: number;
        condominium: Condominium;
    };
}

export interface UserContact
{
    id: number;
    user_id: number;
    value: string;
    type: string;
}

export interface UserOccupation
{
    id: number;
    name: string;
    code: string;
    color: string;
    user?: UserNode;
}
