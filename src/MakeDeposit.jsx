import React, { useContext, useState } from 'react'
import { AppContext } from './context/AppContext';

function MakeDeposit() {
    const { deposit } = useContext(AppContext);
    const [depositData, setDepositData] = useState({});
    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState(depositData[amount] || 1);

    const addDeposit = () => {
        setDepositData({...depositData, [amount]: quantity});
        setAmount("");
        setQuantity(1);
    }

    const removeKey = (currentKey) => {
        const { [currentKey]: item, ...rest} = depositData;
        setDepositData(rest);
    }

    const makeDeposit = (e) => {
        let depositCurrencyList = [];
        Object.entries(depositData).forEach(([currency, quantity]) => {
            depositCurrencyList = depositCurrencyList.concat(Array(Number(quantity)).fill(Number(currency)))
        })
        deposit(e, {amount: depositCurrencyList})
        .then(() => setDepositData({}))
    }

    return (
        <>
            <p className="font-bold leading-6 underline">Make Deposit</p>
            <div className="flex flex-row mt-4 items-end gap-x-2 justify-center w-full">
                <div className='w-2/5'>
                    <label className="font-bold" htmlFor="amount">Amount</label>
                    <select onChange={(e) => setAmount(e.target.value)} value={amount} 
                        name="amount" id="amount" 
                        className='block w-full rounded-md  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                        <option hidden value="">Select</option>
                        <option value="5">5 cents</option>
                        <option value="10">10 cents</option>
                        <option value="20">20 cents</option>
                        <option value="50">50 cents</option>
                        <option value="100">100 cents</option>
                    </select>
                </div>
                <div className='w-1/5'>
                    <label className="font-bold" htmlFor='quantity'>Qty</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                    name="quantity" id="quantity"
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                </div>
                <button type="button" onClick={addDeposit} 
                    className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                    Add
                </button>
            </div>

            {Object.keys(depositData).length > 0 &&
                <div className="flex flex-col items-center w-full">
                    <hr className='border-t-1 border-gray-300 my-5 w-2/4' />
                    <table className="table w-full block text-center">
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(depositData).map(([key, value], index) => 
                                <tr key={index}>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                    <td>{parseInt(key) * parseInt(value)}</td>
                                    <td>
                                        <button
                                            className='rounded-md ring-1 ring-inset ring-red-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
                                            onClick={() => removeKey(key)}>
                                            &#128465;
                                        </button>
                                    </td>
                                </tr>     
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="font-bold">
                                <td colSpan={2} className='text-right'>TOTAL</td>
                                <td>{Object.entries(depositData).reduce((a, [b, c]) => a + (parseInt(b) * parseInt(c)), 0)}</td>
                            </tr>
                            <tr>
                                <td colSpan={4}>
                                    <button 
                                        className='rounded-md align-right bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'
                                        onClick={makeDeposit}>
                                        Complete Deposit
                                    </button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
        </>       
    )
}

export default MakeDeposit