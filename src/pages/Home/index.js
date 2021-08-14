import React from 'react'
import {SideNav, LayoutSidebar} from 'upkit';

import menus from './menu';
import TopBar from '../../component/TopBar';

function Home() {
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
