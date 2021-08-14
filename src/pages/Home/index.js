import {SideNav, LayoutSidebar} from 'upkit';

import React from 'react'
import menus from './menu';

function Home() {
	return (
		<div>
			<LayoutSidebar
				sidebarSize={80}
				sidebar={
					<SideNav items={menus} verticalAlign="top"/>
				}
				content={
					<div className="md:flex md:flex-row-reverse w-full h-full min-h-screen  mr-5 ">
						<div className="md:w-3/4 w-full pl-5 pb-10">konten</div>
						<div className="md:w-1/4 w-full h-full shadow-lg border-r border-white bg-gray-100"> Keranjang</div>
					</div>
				}
			/>
		</div>
	)
}

export default Home
