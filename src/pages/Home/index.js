import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import {SideNav, LayoutSidebar, Responsive, CardProduct, Pagination} from 'upkit';
import BounceLoader from 'react-spinners/BounceLoader';


import menus from './menu';
import TopBar from '../../component/TopBar';

import { config } from '../../config';
import { fetchProduct,setPage, goToNextPage, goToPrevPage } from '../../features/Products/actions';

function Home() {
	let products = useSelector(state => state.products)
	let dispatch = useDispatch()


	React.useEffect(()=>{
		dispatch(fetchProduct());
	},[dispatch,products.currentPage])

	return (
		<div>
			<LayoutSidebar
				sidebarSize={80}
				sidebar={
					<SideNav items={menus} verticalAlign="top"/>
				}
				content={
					<div className="md:flex md:flex-row-reverse w-full h-full min-h-screen mr-5 ">
						<div className="md:w-3/4 w-full pl-5 pb-10">
							<div className="w-full md:w-3/4 pl-5 pb-10">
								<TopBar/>

								{products.status === 'process' && !products.data.length ?
									<div className="flex justify-center items-center">
										<BounceLoader color="red"/>
									</div>
								: null}

								<Responsive desktop={3} items="stretch">
									{products.data.map((product, index)=>{
										return (
											<div className="p-2" key={index}>
												<CardProduct
													title={product.name}
													imgUrl={`${config.api_host}/upload/${product.image_url}`}
													price={product.price}
													onAddToCart={_ => null}
												/>
											</div>
										)
									})}
								</Responsive>
								<div className="text-center my-10">
									<Pagination
										totalItems={products.totalItems}
										page={products.currentPage}
										perPage={products.perPage}
										onChange={page => dispatch(setPage(page))}
										onNext={_ => dispatch(goToNextPage())}
										onPrev={_ => dispatch(goToPrevPage())}/>
								</div>
							</div>
						</div>
						<div className="md:w-1/4 w-full h-full shadow-lg border-r border-white bg-gray-100"> Keranjang</div>
					</div>
				}
			/>
		</div>
	)
}

export default Home
