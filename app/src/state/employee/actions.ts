import { Employee } from '../../types/Employee';

import { ThunkResult } from '../store';

export const addEmployee = (employee: Omit<Employee, 'id'>): ThunkResult => {
    return (dispatch): void => {
        fetch('http://localhost:8080/employee', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        }).catch((error) => {
            console.log(error);
        });
    };
};
