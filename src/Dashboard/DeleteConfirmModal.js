import React from 'react';
import { toast } from 'react-toastify';

const DeleteConfirmModal = ({ deleteDoctor, refetch, setDeleteDoctor }) => {
    const { name, email } = deleteDoctor;
    const handleDelete = () => {
        fetch(`https://doctors-portal-server-swart-ten.vercel.app/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Doctor: ${name} is deleted.`)
                    setDeleteDoctor(null);
                    refetch();

                }
            })
    }
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="delete-confirm-modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-red-500">Are you sure you want to delete the Doctor {name}?</h3>
                    <p className="py-4">Are you sure you want to delete the Doctor {name}?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => handleDelete(email)} className="btn btn-xs btn-error">Delete</button>
                            <button className="btn btn-xs">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default DeleteConfirmModal;