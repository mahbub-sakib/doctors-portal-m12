import React from 'react';


const DoctorRow = ({ doctor, index, refetch, setDeleteDoctor }) => {
    const { name, specialty, img, email } = doctor;



    return (
        <tr>
            <th>{index + 1}</th>
            <td>
                <div className="avatar">
                    <div className="w-20 rounded">
                        <img src={img} alt={name} />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{specialty}</td>

            <td>
                {/* <button onClick={() => setDeleteDoctor(doctor)} className="btn btn-xs btn-error" onClick={() => document.getElementById('delete-confirm-modal').showModal()}>Delete</button> */}
                <button onClick={() => {
                    setDeleteDoctor(doctor);
                    document.getElementById('delete-confirm-modal').showModal();
                }} className="btn btn-xs btn-error">Delete</button>

            </td>
        </tr>
    );
};

export default DoctorRow;