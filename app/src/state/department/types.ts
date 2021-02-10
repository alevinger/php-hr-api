import { Department } from '../../types/Department';

export interface DepartmentState {
    departments: Department[];
    isFetched: boolean;
    isLoading: boolean;
}

export const SET_IS_LOADING = 'department.SET_IS_LOADING';

interface SetIsLoadingAction {
    payload: boolean;
    type: typeof SET_IS_LOADING;
}

export const SET_IS_FETCHED = 'department.SET_IS_FETCHED';

interface SetIsFetchedAction {
    payload: boolean;
    type: typeof SET_IS_FETCHED;
}

export const SET_DEPARTMENTS = 'department.SET_DEPARTMENTS';

interface SetDepartmentsAction {
    payload: Department[];
    type: typeof SET_DEPARTMENTS;
}

export type DepartmentActionTypes = SetIsFetchedAction | SetDepartmentsAction | SetIsLoadingAction;
