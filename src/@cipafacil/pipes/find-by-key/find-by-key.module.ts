import { NgModule } from '@angular/core';
import { CipaFacilFindByKeyPipe } from '@cipafacil/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        CipaFacilFindByKeyPipe
    ],
    exports     : [
        CipaFacilFindByKeyPipe
    ]
})
export class CipaFacilFindByKeyPipeModule
{
}
