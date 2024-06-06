import { CipaFacilNavigationItem } from '@inovite/components/navigation';
import { Message } from 'app/layout/common/messages/messages.types';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { Shortcut } from 'app/layout/common/shortcuts/shortcuts.types';
import {User, UserNode} from 'app/core/user/user.model';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexXAxis } from 'ng-apexcharts';
import {CipaBank} from './modules/deposit-identification/deposit-identification.types';

export interface InitialData
{
    messages: Message[];
    navigation: {
        default: CipaFacilNavigationItem[],
        vertical: CipaFacilNavigationItem[],
        horizontal: CipaFacilNavigationItem[]
    };
    notifications: Notification[];
    shortcuts: Shortcut[];
    user: UserNode;
}

export interface Navigation
{
    default: CipaFacilNavigationItem[];
    vertical: CipaFacilNavigationItem[];
    horizontal: CipaFacilNavigationItem[];
    horizontal_admin: CipaFacilNavigationItem[];
}

export type ChartOptions =
{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    labels: any;
    responsive: ApexResponsive[];
};

export interface Role
{
    id: number;
    condominium_id: number;
    name: string;
    code: string;
    permissions: Permission[];
}

export interface Module
{
    id: number;
    name: string;
    code: string;
    menu: string;
    permissions: Permission[];
}

export interface Permission
{
    id: number;
    name: string;
    code: string;
    module_id: number;
    module: Module;
}

export interface Bank
{
    id?: number;
    code?: string;
    name?: string;
    cipa_banks?: CipaBank[];
}
