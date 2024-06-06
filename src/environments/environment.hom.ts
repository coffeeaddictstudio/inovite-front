export const environment = {
    api: 'https://api.cipa.com.br/mediador_hom',
    lambda: 'https://api.cipa.com.br/app_condominio_lambda_hom',
    smartged: 'https://api.cipa.com.br/smartged_operacional_hom',
    smartgedUpload: 'https://api.cipa.com.br/smartged_hom',
    lambda2: 'https://api.cipa.com.br/app_condominio_lambda_pt2_hom',
    admin: 'https://api.cipa.com.br/app_condominio_admin_hom',
    report : 'https://api.cipa.com.br/gestao_relatorio',
    base: 'https://api.cipa.com.br/cipa_app_doc_hom',
    apiExternal: 'https://correspondente.vamosparcelar.com.br/?key=cipa',
    finance: 'https://api.cipa.com.br/plano_financeiro',
    node: 'https://hom.back.cipafacil.digital',
    nodeBase: 'https://base.cipafacil.digital',
    nodeJobs: 'https://jobs.cipafacil.digital',
    integration: 'https://api.cipa.com.br/cipa_integracao_parceiro',
    baseApiLoadBalance: 'https://cipa-ecs-ap00.cipa.com.br:8082',
    paycheck: 'https://lb-servico-senior-hom-1233073909.us-east-1.elb.amazonaws.com/colaborador/condominio/contracheque',
    frontHost: 'https://hom.cipafacil.digital',
    profile: 'hom',
    production: true,
    pageSize: 25,
    hotJarCode: '',
    pageSizeOptions: [5, 10, 25, 50, 100],
    pdfMaxPages: 50,
    sizeFiles: 20000000,
    acceptFiles: 'image/jpeg,image/jpg,image/png,application/pdf',
    bugsnagKey: '57cd87d9ac47c0d2ce85d0fee8eaa311',
    oneSignalKey: 'dae29288-19f9-44f4-837b-e7ea09d4e1d5',
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
