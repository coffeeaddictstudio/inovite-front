import {UserNode} from '../../core/user/user.model';
import {Unit} from "../unit/unit.types";

export interface CondominiumPaginate
{
    items: Condominium[];
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}

export interface CondominiumUser {
    id?: number;
    condominium_id?: number;
    user_id?: number;
    role_id?: number;
    occupation_id?: number;
    active?: number;
    user?: UserNode;
}

export interface Condominium
{
    id: number;
    code: number;
    name: string;
    thumbnail: string;
    segmentation_id?: number;
    active?: number;
    document?: number;
    ads_postcode?: number;
    ads_address1?: string;
    ads_address2?: string;
    ads_neighborhood?: string;
    ads_complement?: string;
    ads_city?: string;
    ads_state?: string;
    is_filial?: number;
    is_cipa_sindica?: number;
    has_garantiza?: boolean;
    units?: Unit[];
    fantasy_name: string;
    address: string;
    cep: string;
    corporate_reason: string;
    ie: string;
    phone: string;
    cnpj: string;
    status: string;

}

export interface CondominiumStorage
{
    codigo: number;
    ehAssessor: boolean;
    ehSindico: boolean;
    nome: string;
    perfil: string;
    possuiProdutoGestor: boolean;
}
