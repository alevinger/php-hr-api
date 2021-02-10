import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../state/employee/actions';
import { Control } from './UI/Control';
import { Dialog } from './UI/Dialog';

export interface AddEmployeeProps {
    departmentId: number;
    departmentName: string;
    onClose: () => void;
    onSave: () => void;
}

const AddEmployee: FunctionComponent<AddEmployeeProps> = ({ departmentId, departmentName, onClose, onSave }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState<string>('');
    const [salary, setSalary] = useState<number>(0);

    return (
        <Dialog
            title={`Add employee to department ${departmentName}`}
            buttons={[
                {
                    label: 'Cancel',
                    onClick: onClose,
                },
                {
                    label: 'save',
                    onClick: () => {
                        dispatch(
                            addEmployee({
                                name: name,
                                salary: salary || 0,
                                departmentId: departmentId,
                            })
                        );
                        onSave();
                        onClose();
                    },
                },
            ]}
        >
            <>
                <Control>
                    <label>Name:</label>
                    <input type="text" name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
                </Control>

                <Control>
                    <label>Salary:</label>
                    <input
                        type="text"
                        name="salary"
                        value={salary}
                        onChange={(e) => setSalary(Number(e.currentTarget.value))}
                    />
                </Control>
            </>
        </Dialog>
    );
};

export default AddEmployee;
