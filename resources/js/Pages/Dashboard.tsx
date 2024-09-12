import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';
import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SocketCounter = function() {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        window.Echo.leaveAllChannels();
        window.Echo.channel('counter').listen('CounterIncremented', (e: { count: number }) => {
            setCount(e.count)
        });

        // () => {
        //     window.Echo.channel('counter').stopListening('counter.incremented);
        // }
    }, [])

    const incrementCounter = function() {
        axios.post(route('dashboard.increment-socket'));
    }

    return (
        <div className='flex flex-col space-y-4 p-6'>
            <p className='text-5xl'>Socket Counter: {count}</p>

            <PrimaryButton className='w-fit' onClick={incrementCounter}>Increment</PrimaryButton>
        </div>
    )
}

const StateCounter = function() {
    const [count, setCount] = useState<number>(0);

    return (
        <div className='flex flex-col space-y-4 p-6'>
            <p className='text-5xl'>React Counter: {count}</p>

            <PrimaryButton className='w-fit' onClick={() => setCount(count + 1)}>Increment</PrimaryButton>
        </div>
    )
}

const SessionCounter = function({ counter }: { counter: number }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm();

    const submit: any = (e: any) => {
        e.preventDefault();

        patch(route('dashboard.increment'));
    };

    return (
        <div className='flex flex-col space-y-4 p-6'>
            <p className='text-5xl'>Session Counter: {counter}</p>

            <PrimaryButton className='w-fit' onClick={submit}>Increment</PrimaryButton>
        </div>
    )
}

export default function Dashboard({ auth, counter }: { counter: number } & PageProps) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>

                        <SessionCounter counter={counter}/>

                        <StateCounter/>

                        <SocketCounter/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
