// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    api: 'https://api.cipa.com.br/mediador_hom',
    smartged: 'https://api.cipa.com.br/smartged_operacional_hom',
    smartgedUpload: 'https://api.cipa.com.br/smartged_hom',
    lambda: 'https://api.cipa.com.br/app_condominio_lambda_hom',
    lambda2: 'https://api.cipa.com.br/app_condominio_lambda_pt2_hom',
    admin: 'https://api.cipa.com.br/app_condominio_admin_hom',
    report : 'https://api.cipa.com.br/gestao_relatorio',
    apiExternal: 'https://correspondente.vamosparcelar.com.br/?key=cipa',
    // node: 'https://hom.back.cipafacil.digital',
    node: 'https://back.cipafacil.digital',
    // node: 'http://localhost:3000',
    nodeBase: 'https://base.cipafacil.digital',
    nodeJobs: 'http://localhost:3300',
    base: 'https://api.cipa.com.br/cipa_app_doc_hom',
    finance: 'https://api.cipa.com.br/plano_financeiro',
    integration: 'https://api.cipa.com.br/cipa_integracao_parceiro',
    baseApiLoadBalance: 'https://cipa-ecs-ap00.cipa.com.br:8082',
    paycheck: 'https://alb-api-servico-senior-1916280528.sa-east-1.elb.amazonaws.com:8080/colaborador/condominio/contracheque',
    frontHost: 'http://localhost:4200',
    profile: 'hom',
    production: false,
    hotJarCode: '',
    pageSize: 25,
    pageSizeOptions: [5, 10, 25, 50, 100],
    pdfMaxPages: 50,
    sizeFiles: 20000000,
    acceptFiles: 'image/jpeg,image/jpg,image/png,application/pdf',
    bugsnagKey: '57cd87d9ac47c0d2ce85d0fee8eaa311',
    oneSignalKey: '43b601c5-f381-407d-97f4-b312d7c892b8',
    quillModule: {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],
                [{'header': 1}, {'header': 2}],               // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                [{'direction': 'rtl'}],                         // text direction
                [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'font': []}],
                [{'align': []}],
                ['clean'],                                         // remove formatting button
                ['link', 'image']
            ]
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
