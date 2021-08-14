import React from 'react'
import {Card, Text, LayoutOne, LayoutSidebar, Button } from 'upkit'
import { Link } from 'react-router-dom';

function RegisterSuccess() {
	return (
		<div>
			<LayoutOne size="small">
				<Card color="white">
					<div className="text-center">
						<Text as="h3">
							Pendaftaran Berhasil
						</Text>
						<Text>
							Silahkan Masuk Aplikasi
						</Text>
						<br />
						<Link to ="/login">
							<Button fitContainer>
								Masuk
							</Button>
						</Link>
					</div>
				</Card>
			</LayoutOne>
		</div>
	)
}

export default RegisterSuccess
