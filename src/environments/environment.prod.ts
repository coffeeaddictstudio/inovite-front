export const environment = {
    api: 'https://api.cipa.com.br/mediador',
    lambda: 'https://api.cipa.com.br/app_condominio_lambda',
    smartged: 'https://api.cipa.com.br/smartged_operacional',
    smartgedUpload: 'https://api.cipa.com.br/smartged',
    lambda2: 'https://api.cipa.com.br/app_condominio_lambda_pt2',
    admin: 'https://api.cipa.com.br/app_condominio_admin',
    report : 'https://api.cipa.com.br/gestao_relatorio',
    base: 'https://api.cipa.com.br/cipa_app_doc',
    apiExternal: 'https://correspondente.vamosparcelar.com.br/?key=cipa',
    finance: 'https://api.cipa.com.br/plano_financeiro',
    node: 'https://back.cipafacil.digital',
    nodeBase: 'https://base.cipafacil.digital',
    nodeJobs: 'https://jobs.cipafacil.digital',
    integration: 'https://api.cipa.com.br/cipa_integracao_parceiro',
    baseApiLoadBalance: 'https://cipa-ecs-ap00.cipa.com.br:8082',
    paycheck: 'https://appdigital.cipa.com.br:8091/colaborador/condominio/contracheque',
    frontHost: 'https://cipafacil.digital',
    profile: 'prod',
    production: true,
    pageSize: 25,
    hotJarCode: '3010789',
    pageSizeOptions: [5, 10, 25, 50, 100],
    pdfMaxPages: 50,
    sizeFiles: 20000000,
    acceptFiles: 'image/jpeg,image/jpg,image/png,application/pdf',
    bugsnagKey: '57cd87d9ac47c0d2ce85d0fee8eaa311',
    oneSignalKey: 'ca42ef6c-e20d-453b-9cb8-d3b0bfe19bf6',
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
