/* tslint:disable:max-line-length */
import {CipaFacilNavigationItem} from '@inovite/components/navigation';

export const defaultNavigation: CipaFacilNavigationItem[] = [
    {
        id: 'finance',
        title: 'Financeiro',
        type: 'group',
        children: [
            {
                title: 'Pasta Digital',
                type: 'basic',
                link: 'pasta-digital',
                badge: {
                    title: 'Novo',
                    classes: 'bg-blue-700 text-white px-3 ml-4 font-semibold rounded'
                }
            },
            {
                title: 'Envio de contas',
                type: 'basic',
                link: 'envio-de-contas'
            },
            {
                title: 'Contas a pagar',
                type: 'basic',
                link: 'contas-a-pagar'
            },
            {
                title: 'Extrato',
                type: 'basic',
                link: 'extrato'
            },
            {
                title: 'Devedores',
                type: 'basic',
                link: 'devedores'
            },
            {
                title: 'Orçado x Realizado',
                type: 'basic',
                link: 'orcado-realizado'
            },
            {
                title: 'Balancete',
                type: 'basic',
                link: 'balancete'
            },
            {
                title: 'Boleto',
                type: 'basic',
                link: 'boletos'
            },
            {
                title: 'Acordos',
                type: 'basic',
                link: 'acordos'
            }
        ]
    },
    {
        id: 'social',
        title: 'Social',
        type: 'group',
        children: [
            {
                title: 'Mural de avisos',
                type: 'basic',
                link: 'mural-de-avisos'
            },
            {
                title: 'Unidades',
                type: 'basic',
                link: 'unidades'
            },
            {
                title: 'Encomendas',
                type: 'basic',
                link: 'encomendas'
            },
            {
                title: 'Reserva de espaço',
                type: 'basic',
                link: 'reserva-de-espaco'
            },
            {
                title: 'Enquetes',
                type: 'basic',
                link: 'enquete'
            }
        ]
    },
    {
        id: 'tools',
        title: 'Ferramentas',
        type: 'group',
        children: [
            {
                title: 'Notificar assessor',
                type: 'basic',
                link: 'notificar-assessor'
            },
            {
                title: 'Enviar ideia',
                type: 'basic',
                link: 'enviar-ideia'
            },
            {
                title: 'Gestão de documentos',
                type: 'basic',
                link: 'gestao-documento'
            },
            {
                title: 'Manad',
                type: 'basic',
                link: 'manad'
            }
        ]
    },
    {
        id: 'services',
        title: 'Serviços',
        type: 'group',
        children: [
            {
                title: 'Compras online',
                type: 'basic',
                link: 'engelink'
            },
            {
                title: 'Serviços CIPA',
                type: 'basic',
                link: 'servicos'
            }
        ]
    },
    {
        id: 'manager',
        title: 'Gestor Operacional',
        type: 'group',
        children: [
            {
                title: 'Atividades',
                type: 'basic',
                link: 'atividades'
            },
            {
                title: 'Estoque',
                type: 'basic',
                link: 'estoque'
            },
            {
                title: 'Gestão de cadastros',
                type: 'basic',
                link: 'gestao-de-cadastros'
            }
        ]
    },
    {
        id: 'benefit-club',
        title: 'Clube de Vantagens',
        type: 'basic',
    }
];

export const verticalNavigation: CipaFacilNavigationItem[] = [
    {
        id: 'finance',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'social',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'tools',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'services',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'manager',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'benefit-club',
        title: '',
        type: 'basic',
    }
];

export const horizontalNavigation: CipaFacilNavigationItem[] = [
    {
        id: 'home',
        title: '',
        type: 'basic',
        icon: 'awesome_solid:home',
        link: 'dashboard'
    },
    {
        id: 'finance',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'social',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'tools',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'services',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'manager',
        title: '',
        type: 'group',
        children: []
    },
    {
        id: 'benefit-club',
        title: '',
        type: 'basic',
    }
];
