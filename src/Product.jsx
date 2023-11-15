import React, { useContext, useState } from 'react'
import { AppContext } from './context/AppContext';

function Product({product, index}) {
    const { user, products, buyProduct } = useContext(AppContext);
    const [buyIndex, setBuyIndex] = useState(null);
    const [quantity, setQuantity] = useState(1);
  
    const tooExpensive = buyIndex !== null && user.deposit < products[buyIndex].cost * quantity;
    const excessQuantity = buyIndex !== null && quantity > products[buyIndex].amountAvailable;
  
    return (
        <div className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
            <img
                src={`https://random.imagecdn.app/200/200`}
                alt={product.productName}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                    <span>
                        {product.productName}
                    </span>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Quantity Available - {product.amountAvailable}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.cost} cents</p>
            </div>
            {product.amountAvailable ===  0 && 
                <div className="flex flex-row justify-center mt-4">
                    <span className="rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm">
                    Not Available
                    </span>
                </div>
            }
            {buyIndex !== index && product.amountAvailable > 0 &&
                <div className="flex flex-row justify-center mt-4">
                    <button type="button" onClick={() => {setBuyIndex(index); setQuantity(1)}} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
                        Buy Product
                    </button>
                </div>
            }
            {buyIndex === index &&
                <>
                    <div className="flex flex-row mt-4 items-end gap-x-2 justify-center">
                        <div className='w-1/4'>
                            <span className="font-bold">Quantity</span>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} name="quantity" id="quantity" 
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${excessQuantity || tooExpensive ? 'ring-red-400 focus:ring-red-400 ' : ''}`} />
                        </div>
                        <button type="button" disabled={excessQuantity || tooExpensive} onClick={(e) => buyProduct(e, {productId: product.id, amountOfProducts: quantity}).then(() => setBuyIndex(null))} 
                            className='rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm'>
                            Buy
                        </button>
                    </div>
                    {excessQuantity && <p className='text-red-400 text-xs text-center'>Quantity selected exceeds available quantity</p>}
                    {tooExpensive && <p className='text-red-400 text-xs text-center'>Deposit amount {user.deposit} is less than total cost {product.cost * quantity}</p>}
                </>
            }
        </div>
    )
}

export default Product