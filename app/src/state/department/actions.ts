/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { stringify } from 'query-string';
import { DepartmentActionTypes, SET_DEPARTMENTS, SET_IS_FETCHED, SET_IS_LOADING } from './types';
import { Department } from '../../types/Department';
import { ThunkResult } from '../store';

export const addDepartment = (name: string): ThunkResult => {
    return (dispatch: (arg0: DepartmentActionTypes) => void): void => {
        dispatch(setIsLoadingDepartments(true));
        dispatch(setIsFetchedDepartments(false));

        const params = {
            name,
        };

        fetch('http://localhost:8080/department/', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        }).catch((error) => {
            console.log(error);
        });
    };
};

export const getDepartments = (minNoOfEmployees?: number, salary?: number, showMaxSalary?: boolean): ThunkResult => {
    return (dispatch: (arg0: DepartmentActionTypes) => void): void => {
        dispatch(setIsLoadingDepartments(true));
        dispatch(setIsFetchedDepartments(false));

        const params = {
            minNoOfEmployees,
            salary,
            showMaxSalary,
        };

        fetch(`http://localhost:8080/department?${stringify(params)}`, {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            console.log(response);
                dispatch(setIsLoadingDepartments(false));
                dispatch(setDepartments((response as unknown) as Department[]));
                dispatch(setIsFetchedDepartments(true));
            })
            .catch((error) => {
                dispatch(setIsLoadingDepartments(false));
                dispatch(setIsFetchedDepartments(false));
                // eslint-disable-next-line no-alert
                window.alert(error);
            });
    };
};

export const setIsLoadingDepartments = (isLoading: boolean): DepartmentActionTypes => ({
    payload: isLoading,
    type: SET_IS_LOADING,
});

export const setIsFetchedDepartments = (isFetched: boolean): DepartmentActionTypes => ({
    payload: isFetched,
    type: SET_IS_FETCHED,
});

export const setDepartments = (departments: Department[]): DepartmentActionTypes => ({
    payload: departments,
    type: SET_DEPARTMENTS,
});
