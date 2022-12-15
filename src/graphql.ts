
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateEngineerInput {
    firstName: string;
    lastName: string;
}

export interface Engineer {
    __typename?: 'Engineer';
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
}

export interface IQuery {
    engineer(id: number): Nullable<Engineer> | Promise<Nullable<Engineer>>;
}

export interface IMutation {
    createEngineer(input?: Nullable<CreateEngineerInput>): Nullable<Engineer> | Promise<Nullable<Engineer>>;
}

type Nullable<T> = T | null;
