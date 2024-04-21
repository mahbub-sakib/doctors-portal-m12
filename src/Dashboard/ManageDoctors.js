import React from 'react';
import Loading from '../Pages/Shared/Loading';
import { useQuery } from 'react-query';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('http://localhost:5000/doctor', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl'>Manage Doctors: {doctors.length}</h2>

            <table className="table w-full">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Cpecialty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        doctors.map((doctor, index) => <DoctorRow
                            key={doctor._key}
                            doctor={doctor}
                            index={index}
                            refetch={refetch}
                        ></DoctorRow>)
                    }
                </tbody>
            </table>

        </div>
    );
};

export default ManageDoctors;