import React, { useState } from 'react';
import Loading from '../Pages/Shared/Loading';
import { useQuery } from 'react-query';
import DoctorRow from './DoctorRow';
import DeleteConfirmModal from './DeleteConfirmModal';

const ManageDoctors = () => {
    const [deleteDoctor, setDeleteDoctor] = useState(null);
    const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('https://doctors-portal-server-swart-ten.vercel.app/doctor', {
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
                            setDeleteDoctor={setDeleteDoctor}
                        ></DoctorRow>)
                    }
                </tbody>
            </table>
            {deleteDoctor && <DeleteConfirmModal
                deleteDoctor={deleteDoctor}
                refetch={refetch}
                setDeleteDoctor={setDeleteDoctor}
            ></DeleteConfirmModal>}
        </div>
    );
};

export default ManageDoctors;