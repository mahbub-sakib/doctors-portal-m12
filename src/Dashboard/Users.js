import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Pages/Shared/Loading';
import UserRow from './UserRow';

const Users = () => {
    const { data: users, isLoading } = useQuery('users', () => fetch('http://localhost:5000/user').then(res => res.json()))
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-2xl'>All Users: {Users.length()}</h2>

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
                        ></UserRow>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;