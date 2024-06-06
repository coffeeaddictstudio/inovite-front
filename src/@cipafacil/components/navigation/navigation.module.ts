import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CipaFacilScrollbarModule } from '@cipafacil/directives/scrollbar/public-api';
import { CipaFacilHorizontalNavigationBasicItemComponent } from '@cipafacil/components/navigation/horizontal/components/basic/basic.component';
import { CipaFacilHorizontalNavigationBranchItemComponent } from '@cipafacil/components/navigation/horizontal/components/branch/branch.component';
import { CipaFacilHorizontalNavigationDividerItemComponent } from '@cipafacil/components/navigation/horizontal/components/divider/divider.component';
import { CipaFacilHorizontalNavigationSpacerItemComponent } from '@cipafacil/components/navigation/horizontal/components/spacer/spacer.component';
import { CipaFacilHorizontalNavigationComponent } from '@cipafacil/components/navigation/horizontal/horizontal.component';
import { CipaFacilVerticalNavigationAsideItemComponent } from '@cipafacil/components/navigation/vertical/components/aside/aside.component';
import { CipaFacilVerticalNavigationBasicItemComponent } from '@cipafacil/components/navigation/vertical/components/basic/basic.component';
import { CipaFacilVerticalNavigationCollapsableItemComponent } from '@cipafacil/components/navigation/vertical/components/collapsable/collapsable.component';
import { CipaFacilVerticalNavigationDividerItemComponent } from '@cipafacil/components/navigation/vertical/components/divider/divider.component';
import { CipaFacilVerticalNavigationGroupItemComponent } from '@cipafacil/components/navigation/vertical/components/group/group.component';
import { CipaFacilVerticalNavigationSpacerItemComponent } from '@cipafacil/components/navigation/vertical/components/spacer/spacer.component';
import { CipaFacilVerticalNavigationComponent } from '@cipafacil/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        CipaFacilHorizontalNavigationBasicItemComponent,
        CipaFacilHorizontalNavigationBranchItemComponent,
        CipaFacilHorizontalNavigationDividerItemComponent,
        CipaFacilHorizontalNavigationSpacerItemComponent,
        CipaFacilHorizontalNavigationComponent,
        CipaFacilVerticalNavigationAsideItemComponent,
        CipaFacilVerticalNavigationBasicItemComponent,
        CipaFacilVerticalNavigationCollapsableItemComponent,
        CipaFacilVerticalNavigationDividerItemComponent,
        CipaFacilVerticalNavigationGroupItemComponent,
        CipaFacilVerticalNavigationSpacerItemComponent,
        CipaFacilVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        CipaFacilScrollbarModule
    ],
    exports     : [
        CipaFacilHorizontalNavigationComponent,
        CipaFacilVerticalNavigationComponent
    ]
})
export class CipaFacilNavigationModule
{
}
