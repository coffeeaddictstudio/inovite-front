export interface NotificationPaginate
{
    notificacoes: Notification[];
    total: number;
}

export interface Notification
{
    data: string;
    idNotificacao: string;
    identificacao: string;
    origem: string;
    selecionada: boolean;
    texto: string;
    visualizada: boolean;
}
