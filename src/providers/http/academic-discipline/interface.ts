export interface IAcademicDiscipline {
    uuid: string
    name: string;
    description?: string
}

export interface ICreateAcademicDiscipline extends Partial<Omit<IAcademicDiscipline, 'uuid'>> {}

export interface IUpdateAcademicDiscipline extends Partial<ICreateAcademicDiscipline> {}