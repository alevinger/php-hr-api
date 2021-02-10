/* eslint-disable import/no-anonymous-default-export */
import { DepartmentActionTypes, DepartmentState, SET_DEPARTMENTS, SET_IS_FETCHED, SET_IS_LOADING } from './types';
import { Department } from '../../types/Department';

const initialState: DepartmentState = {
    departments: [] as Department[],
    isFetched: false,
    isLoading: false,
};

export default (state = initialState, action: DepartmentActionTypes): DepartmentState => {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload,
            };

        case SET_IS_FETCHED:
            return {
                ...state,
                isFetched: action.payload,
            };

        case SET_DEPARTMENTS:
            return {
                ...state,
                departments: action.payload,
            };

        default:
            return state;
    }
};
