import React, { useContext } from 'react'
import { AppContext } from './context/AppContext';
import MakeDeposit from './MakeDeposit';
import ProductUpdate from './ProductUpdate';

const SELLER = "seller";
const BUYER = "buyer";

function UserProfile() {
    const { user } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-x-6">
            <img className="h-16 w-16 mb-3 rounded-full" src={`https://ui-avatars.com/api/?name=${user.username}`} alt={user.name || user.username} />
            <div className='text-center'>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{user.name || user.username}</h3>
                <span className="inline-block my-2 whitespace-nowrap rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold leading-6 text-slate-700">{user.role}</span>
                <h3 className="text-base leading-7 text-gray-700">
                    <span className="font-bold">Current Deposit:</span> {user.deposit}
                </h3>
            </div>
            <hr className='w-full block my-5 border-t-2 border-gray-300' />
            {user.role === SELLER && <ProductUpdate />}
            {user.role === BUYER && <MakeDeposit />}
        </div>
    )
}

export default UserProfile