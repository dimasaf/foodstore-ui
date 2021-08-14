import React from 'react'
import {InputPassword, InputText, Button, FormControl, Card, LayoutOne} from 'upkit'
import {useForm} from 'react-hook-form'
import {useHistory, Redirect, Link} from 'react-router-dom'

import {useDispatch} from 'react-redux';
import {userLogin} from '../../features/Auth/actions';
import {login} from '../../api/auth';

import StoreLogo from '../../component/StoreLogo'
import {rules} from './validation'

const statuslist = {
	idle:'idle',
	proccess: 'proccess',
	success : 'success',
	error: 'error',
}

function Login() {
	const {register, handleSubmit,  formState: { errors }, setError} = useForm()
	const [status, setStatus] = React.useState(statuslist.idle)
	const dispatch = useDispatch()
	const history= useHistory()

	const onSubmit = async ({email, password})=>{
		setStatus(statuslist.proccess)

		let {data} = await login(email, password);

		if(data.error){
			setError('password', {type: 'invalidCredential', message:data.message})
			setStatus(statuslist.error)
		}else{
			let {user,token}=data;
			dispatch(userLogin(user, token));
			history.push('/')
		}
		setStatus(statuslist.success)
	}

	return (
		<LayoutOne size="small">
			<br />
			<Card color="white">
				<div className="text-center mb-5">
					<StoreLogo/>
				</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl errorMessage={errors.email?.message}>
						<InputText placeholder="email" name="email" fitContainer {...register("email", rules.email)}/>

					</FormControl>
					<FormControl errorMessage={errors.password?.message}>
						<InputPassword placeholder="password" name="password" fitContainer {...register("password", rules.password)}/>
					</FormControl>
					<Button fitContainer size="large" disabled={status === 'process'}>
						Login
					</Button>
				</form>
				<div className="text-center mt-2">
					Belum punya akun? <Link to="/register"><b>Daftar sekarang.</b></Link>
				</div>
			</Card>
		</LayoutOne>
	)
}

export default Login
