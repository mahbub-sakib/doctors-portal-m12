import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Pages/Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://doctors-portal-server-swart-ten.vercel.app/user', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl'>All Users: {users.length}</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => <UserRow
                            key={user._id}
                            user={user}
                            refetch={refetch}
                        ></UserRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;