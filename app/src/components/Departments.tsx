import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { addDepartment, getDepartments } from '../state/department/actions';
import { useDispatch } from 'react-redux';
import useSelector from '../state/useSelector';
import Table from './UI/Table';
import { Row, TableInstance } from 'react-table';
import { Button } from './UI/Button';
import { Dialog } from './UI/Dialog';
import { Control } from './UI/Control';
import AddEmployee from './AddEmployee';
import { Department  as TDepartment} from '../types/Department';

// eslint-disable-next-line react/jsx-no-literals
const Departments: FunctionComponent = () => {
    const dispatch = useDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const departmentData = useSelector(({ departments }) => departments.departments);
    const [showMaxSalary, setShowMaxSalary] = useState(false);
    const [showOnly, setShowOnly] = useState(false);
    const [minNoOfEmployees, setMinNoOfEmployees] = useState<number | undefined>(undefined);
    const [salary, setSalary] = useState<number | undefined>(undefined);
    const [showAddDepartmentDialog, setShowAddDepartmentDialog] = useState(false);
    const [showAddEmployeeDialog, setShowAddEmployeeDialog] = useState(false);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number | undefined>(undefined);
    const [selectedDepartmentName, setSelectedDepartmentName] = useState<string>('');
    const [departmentName, setDepartmentName] = useState('');

    useEffect(() => {
        dispatch(getDepartments(minNoOfEmployees, salary, showMaxSalary));
    }, [dispatch, minNoOfEmployees, salary, showMaxSalary]);

    useEffect(() => {
        if (showOnly) {
            setMinNoOfEmployees(2);
            setSalary(50000);
        } else {
            setMinNoOfEmployees(undefined);
            setSalary(undefined);
        }
    }, [dispatch, showOnly]);

    const columns = useMemo(() => {
        if (showMaxSalary) {
            return ([
                {
                    Header: 'Department',
                    // First group columns
                    columns: [
                        {
                            Header: 'Id',
                            accessor: 'id',
                        },
                        {
                            Header: 'Name',
                            accessor: 'name',
                        },
                        {
                            Header: 'Max salary',
                            accessor: 'salary',
                        },
                        {
                            Header: 'Action',
                            Cell: ({ row }: {row: Row<TDepartment>}) => (
                                <Button label="Add employee" onClick={() => {
                                    setSelectedDepartmentId(row.original.id);
                                    setSelectedDepartmentName(row.original.name);
                                    setShowAddEmployeeDialog(true);
                                    }} />
                            ),
                        },
                    ],
                },
            ] as unknown) as TableInstance['columns'];
        } else {
            return ([
                {
                    Header: 'Department',
                    // First group columns
                    columns: [
                        {
                            Header: 'Id',
                            accessor: 'id',
                        },
                        {
                            Header: 'Name',
                            accessor: 'name',
                        },
                        {
                            Header: 'Action',
                            Cell: ({ row }: {row: Row<TDepartment>}) => (
                                <Button label="Add employee" onClick={() => 
                                    {
                                        setSelectedDepartmentId(row.original.id);
                                        setSelectedDepartmentName(row.original.name);
                                        setShowAddEmployeeDialog(true);
                                        }} />
                            ),
                        },
                    ],
                },
            ] as unknown) as TableInstance['columns'];
        }
    }, [showMaxSalary]);

    return (
        <>
            <Control>
                <input
                    type="checkbox"
                    checked={showMaxSalary}
                    name="checkbox1"
                    onChange={(): void => {
                        setShowMaxSalary(!showMaxSalary);
                    }}
                    value="showMaxSalary"
                />
                <label>Show max salary</label>
            </Control>
            <Control>
                <input
                    type="checkbox"
                    checked={showOnly}
                    name="checkbox2"
                    onChange={(): void => {
                        setShowOnly(!showOnly);
                    }}
                    value="showOnly"
                />
                <label>Show only departments with more than two employees that earn over 50k</label>
            </Control>
            <Control>
                <Button label="Add department" onClick={() => setShowAddDepartmentDialog(true)} />
            </Control>
            <Table columns={columns} data={departmentData} />
            {showAddDepartmentDialog && (
                <Dialog
                    title="Add department"
                    buttons={[
                        {
                            label: 'Cancel',
                            onClick: () => setShowAddDepartmentDialog(false),
                        },
                        {
                            label: 'save',
                            onClick: () => {
                                if (departmentName.length) {
                                    dispatch(addDepartment(departmentName));
                                    setShowAddDepartmentDialog(false);
                                    setShowOnly(false);
                                }
                            },
                        },
                    ]}
                >
                    <Control>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.currentTarget.value)}
                        />
                    </Control>
                </Dialog>
            )}

            {showAddEmployeeDialog && selectedDepartmentId && (
                <AddEmployee 
                    departmentId={selectedDepartmentId} 
                    departmentName={selectedDepartmentName} 
                    onClose={() => setShowAddEmployeeDialog(false)} 
                    onSave={() => dispatch(getDepartments(minNoOfEmployees, salary, showMaxSalary))}/>
            )}
        </>
    );
};

export default Departments;
