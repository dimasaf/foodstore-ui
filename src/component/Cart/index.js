import React from 'react'
import { arrayOf, string, shape, oneOfType, number, func } from 'prop-types';
import {CardItem, Button, Text} from 'upkit'
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import { sumPrice } from '../../utils/sum-price';

import { config } from '../../config';
import { formatRupiah } from '../../utils/format-rupiah';

function Cart({items, onItemInc, onItemDec, onCheckOut}) {
	let total = sumPrice(items);

	return (
		<div className="px-2 border-b mt-5 pb-5">
			<div className="text-3xl flex items-center text-red-700 mb-4">
				<FaCartPlus/>
				<div className="ml-2">
					Keranjang
				</div>
			</div>
			<Text as='h5'>
			Total:{formatRupiah(total)}
			</Text>
			<Button
				text="Checkout"
				fitContainer
				iconAfter={<FaArrowRight/>}
				disabled={!items.length}
				onClick={onCheckOut}
			/>
			{
				!items.length ? <div className="text-center text-sm text-red-900">belum ada items di keranjang </div> : null
			}
			 <div className="p-2">
				{
					items.map((item, index) => {
						return <div key={index} className="my-2">
							<CardItem
								imgUrl={`${config.api_host}/upload/${item.image_url}`}
								name={item.name}
								qty={item.qty}
								color="orange"
								onInc={_ => onItemInc(item)}
								onDec={_ => onItemDec(item)}
							/>
						</div>
					})
				}
			</div>
		</div>
	)
}

export default Cart

Cart.propTypes = {
	items:arrayOf(shape({
	_id:string.isRequired,
	name:string.isRequired,
	qty:oneOfType([string, number]).isRequired
	})),
	onItemDec:func,
	onItemInc:func,
	onCheckout: func,
}