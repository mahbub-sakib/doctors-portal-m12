import React from 'react';
import { useForm } from 'react-hook-form';
import Loading from '../Pages/Shared/Loading';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const AddDoctor = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('https://doctors-portal-server-swart-ten.vercel.app/service').then(res => res.json()))

    const imgStorageKey = '22e52da55768e226042d0897370d355f'

    /*
    3 ways to store images:
    1. 3rd party storage //Free open public storage is ok for practice project
    2. your own storage in your own server (file system)
    3. dATABASE: MONGOdb

    YUP: to validate file. Yub file validation for react hook form
    */

    const onSubmit = async (data) => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        img: img
                    }
                    fetch('https://doctors-portal-server-swart-ten.vercel.app/doctor', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success('Doctor added successfully')
                                reset();
                            }
                            else {
                                toast.error('Failed to add the doctor')
                            }
                        })
                }
                // console.log('imgbb', result);
            })
        // console.log('data', data);
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2>Add a Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Your name"
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'Name is required'
                            }
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Your Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'Email is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide a valid email' // JS only: <p>error message</p> TS only support string
                            }
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register("specialty")} className="select input-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >
                                {service.name}
                            </option>)
                        }

                    </select>

                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input type="file"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'Image is required'
                            }
                        })}
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>

                <input className='btn w-full max-w-xs' type="submit" value="Add" />
            </form>
        </div>
    );
};

export default AddDoctor;