import { Department } from './Department';

export interface Employee {
    departmentId: Department['id'];
    id: number;
    name: string;
    salary: number;
}
