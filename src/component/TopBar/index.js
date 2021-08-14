import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Responsive,ButtonCircle } from 'upkit'

import StoreLogo from '../StoreLogo'

function TopBar() {
	let auth = useSelector(state => state.auth)

	return (
		<Responsive desktop={2} justify="between" items="center">
			<div>
				<StoreLogo/>
			</div>
			<div className="mr-5 text-right">
				<Link to={auth?.user ? "/account" : "/login"}>
					<div className="mr-2 inline-block text-red-600 font-bold">
						{auth?.user?.full_name}
					</div>
				</Link>
			</div>
		</Responsive>
	)
}

export default TopBar
