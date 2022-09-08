//interface TDO par mapear el ingreso de organizaciones
export interface OrganizationTDO {
    name: string;
    status: number;
    email: string;
}

// export interface TribuTDO extends OrganizationTDO {
//     id_tribe: number;
//     name_tribu: string;
//     status_tribu: number;
// }
// export interface RepositoryTDO extends TribuTDO {
//     id_repository: number;
//     name_repository: string;
//     state: string;
//     create_time: string;
//     statusRepository: string;
// }


export interface RespuestaRepositoryTDO {
    id: string;
    name: string;
    tribe: string;
    organization: string;
    coverage: string;
    codeSmells: number;
    bugs: number;
    vulnerabilities: number;
    hotspots: number;
    verificationState: string;
    state: string;
}

export interface InterfaceRegistreTDO {
    name: string;
    status: number;
    name_tribu: string;
    status_tribu: number;
    coverage: number;
    codeSmells: number;
    bugs: number;
    vulnerabilities: number;
    hotspots: number;
    name_repository: string;
    state: string;
    statusRepository: string;
}

