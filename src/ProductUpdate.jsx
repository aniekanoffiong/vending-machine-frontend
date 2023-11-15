import React, { useContext, useState } from 'react'
import { AppContext } from './context/AppContext';

function ProductUpdate() {
    const { products, user, createProduct, updateProduct, deleteProduct } = useContext(AppContext);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [newProduct, setNewProduct] = useState(null);

    return (
        <>
            {newProduct !== null &&
                <div className="flex flex-row flex-wrap mt-4 items-end justify-center w-full mb-3">
                    <div className='w-full p-1'>
                        <label className="font-semi-bold text-sm" htmlFor="amount">Product Name</label>
                        <input type="text" value={newProduct.productName} onChange={(e) => setNewProduct({...newProduct, [e.target.name]: e.target.value})}
                            name="productName" id="productName"
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                    </div>
                    <div className='w-2/5 p-1'>
                        <label className="font-semi-bold text-sm" htmlFor="amount">Quantity</label>
                        <input type="number" value={newProduct.amountAvailable} onChange={(e) => setNewProduct({...newProduct, [e.target.name]: e.target.value})}
                            name="amountAvailable" id="amountAvailable"
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                    </div>
                    <div className='w-3/5 p-1 flex flex-row items-end gap-1'>
                        <div>
                            <label className="font-semi-bold text-sm" htmlFor="amount">Price</label>
                            <input type="number" value={newProduct.cost} onChange={(e) => setNewProduct({...newProduct, [e.target.name]: e.target.value})}
                                name="cost" id="cost"
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                        </div>
                        <span className='mt-2 relative bottom-2'>cents</span>
                    </div>
                    <div className="flex flex-row gap-1 mt-2">
                        <button
                            className='rounded-md ring-1 ring-inset ring-indigo-300 bg-indigo-600 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm'
                            onClick={() => createProduct(newProduct).then(() => setCurrentProduct(null))}>
                            Save
                        </button>
                        <button
                            className='rounded-md ring-1 ring-inset ring-red-300 bg-red-400 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm'
                            onClick={() => setNewProduct(null)}>
                            Cancel
                        </button>
                    </div>
                </div>
            }
            {newProduct === null &&
                <div className="flex flex-row justify-end w-full mb-2">
                    <button
                        className='rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold leading-6 text-white shadow-sm'
                        onClick={() => {setNewProduct({productName: '', amountAvailable: '', cost: ''});setCurrentProduct(null)}}>
                        Create New Product
                    </button>
                </div>
            }
            {newProduct === null &&
                <>
                    <p className="font-bold leading-6 underline">Product Update</p>
                    {products && products.filter((current) => current.sellerId === user.id).length > 0 &&
                        <table className="table w-full block text-center text-sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Qty</th>
                                    <th>Cost</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>            
                                {products && products.filter((current) => current.sellerId === user.id)
                                    .map((current) =>
                                        <tr key={current.id}>
                                            <td>
                                                {currentProduct && currentProduct.id === current.id &&
                                                    <input type="text" value={currentProduct.productName} onChange={(e) => setCurrentProduct({...currentProduct, [e.target.name]: e.target.value})}
                                                    name="productName" id="productName"
                                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                                                }
                                                {(!currentProduct || currentProduct.id !== current.id) && current.productName}
                                            </td>
                                            <td>
                                                {currentProduct && currentProduct.id === current.id &&
                                                    <input type="number" value={currentProduct.amountAvailable} onChange={(e) => setCurrentProduct({...currentProduct, [e.target.name]: e.target.value})}
                                                    name="amountAvailable" id="amountAvailable"
                                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                                                }
                                                {(!currentProduct || currentProduct.id !== current.id) && current.amountAvailable}
                                            </td>
                                            <td>
                                                {currentProduct && currentProduct.id === current.id &&
                                                    <input type="number" value={currentProduct.cost} onChange={(e) => setCurrentProduct({...currentProduct, [e.target.name]: e.target.value})}
                                                    name="cost" id="cost"
                                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`} />
                                                }
                                                {(!currentProduct || currentProduct.id !== current.id) && `${current.cost} cents`}
                                            </td>
                                            <td>
                                                {currentProduct && currentProduct.id === current.id &&
                                                    <div className='flex flex-col gap-1'>
                                                        <button
                                                            className='rounded-md pr-1 ring-1 ring-inset ring-indigo-300 px-2 py-1 text-sm font-semibold leading-6 shadow-sm'
                                                            onClick={() => updateProduct(currentProduct.id, currentProduct).then(() => setCurrentProduct(null))}>
                                                            Save
                                                        </button>
                                                        <button
                                                            className='rounded-md ring-1 ring-inset ring-red-500 px-2 py-1 text-sm font-semibold leading-6 shadow-sm'
                                                            onClick={() => setCurrentProduct(null)}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                }
                                                {(!currentProduct || currentProduct.id !== current.id) &&
                                                    <div className='flex flex-row gap-1'>
                                                        <button
                                                            className='rounded-md ring-1 ring-inset ring-indigo-300 px-2 py-1 text-sm font-semibold leading-6 shadow-sm'
                                                            onClick={() => setCurrentProduct(current)}>
                                                            &#9998;
                                                        </button>
                                                        <button
                                                            className='rounded-md ring-1 ring-inset ring-red-500 px-2 py-1 text-sm font-semibold leading-6 shadow-sm'
                                                            onClick={() => deleteProduct(current.id).then(() => setCurrentProduct(null))}>
                                                            &#128465;
                                                        </button>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    } 
                </>
            }
        </>
    )
}

export default ProductUpdate