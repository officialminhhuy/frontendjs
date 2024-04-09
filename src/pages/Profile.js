import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md";
import Changeprofile from '../components/changeprofile';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);

    const fetchCurrentUserDetails = async () => {
        try {
            const fetchData = await fetch(SummaryApi.current_user.url, {
                method: SummaryApi.current_user.method,
                credentials: 'include'
            });
            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setCurrentUser(dataResponse.data);
            } else {
                toast.error(dataResponse.message);
            }
        } catch (error) {
            console.error("Error fetching current user details: ", error);
            toast.error("Error fetching current user details");
        }
    };

    useEffect(() => {
        fetchCurrentUserDetails();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-black text-white'>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {currentUser && (
                        <tr>
                            <td>{currentUser.name}</td>
                            <td>{currentUser.email}</td>
                            <td>{currentUser.role}</td>
                            <td>{moment(currentUser.createdAt).format('LL')}</td>
                            <td>
                                <button
                                    className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                    onClick={() => setOpenUpdateRole(true)}
                                >
                                    <MdModeEdit />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {openUpdateRole && (
                <Changeprofile
                    onClose={() => setOpenUpdateRole(false)}
                    name={currentUser.name}
                    email={currentUser.email}
                    role={currentUser.role}
                    userId={currentUser._id}
                    callFunc={fetchCurrentUserDetails}
                />
            )}
        </div>
    );
};

export default Profile;
