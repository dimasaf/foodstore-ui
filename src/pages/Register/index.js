import * as React from 'react'
import {useForm} from 'react-hook-form'
import { useHistory, Link } from 'react-router-dom';

import {Button, Card, FormControl, LayoutOne, InputText, InputPassword } from 'upkit'

import { registerUser } from '../../api/auth'

import {rules} from './validation'

const statuslist ={
	idle: 'idle',
	process: 'process',
	success: 'success',
	error: 'error',
}

function Register() {
	// fungsi dari useForm()
	let {register, handleSubmit,  formState: { errors }, setError} = useForm();

	const [status, setStatus] = React.useState(statuslist.idle)
	let history = useHistory()

	const onSubmit = async formData => {
		// alert(JSON.stringify(formData));

		// pertama cek password == pasword_confirmation
		let { password, password_confirmation } = formData;
		if(password !== password_confirmation) {
			return setError('password_confirmation', {type: 'equality',message: 'Konfirmasi password harus dama dengan password'});
		}


		setStatus(statuslist.process)
		// tidak dijalankan ketika fungsi diatas gagal, (karna return)
		let {data} = await registerUser(formData)
		if(data.error){
			let fields = Object.keys(data.field)

			fields.forEach(field => {
				setError(field, {type: 'server', message:data.field[fields]?.properties?.message})
			})
		setStatus(statuslist.error);
		return;
		}
	setStatus(statuslist.success)

	history.push('/register/berhasil');

	}

	return (
		<LayoutOne size="small">
			<Card color="white">
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl errorMessage={errors.full_name?.message}>
						<InputText name="full_name" placeholder="Nama Lengkap" fitContainer {...register("full_name", rules.full_name )}/>
					</FormControl>
					<FormControl errorMessage={errors.email?.message}>
						<InputText name="email" placeholder="Email" fitContainer {...register("email", rules.email)}/>
					</FormControl>
					<FormControl errorMessage={errors.password?.message}>
						<InputPassword name="password" placeholder="Password" fitContainer {...register("password", rules.password)}/>
					</FormControl>
					<FormControl errorMessage={errors.password_confirmation?.message}>
						<InputPassword name="password_confirmation" placeholder="Konfirmasi Password" fitContainer {...register("password_confirmation", rules.password_confirmation)}/>
					</FormControl>
					<Button size="large" fitContainer disabled={status === statuslist.process}>{status === statuslist.process ? "Prosses" : "Mendaftar"}</Button>
				</form>
				<div className="text-center mt-2">
					Sudah punya akun? <Link to="/login"> <b> Masuk Sekarang. </b> </Link>
				</div>
			</Card>
		</LayoutOne>
	)
}

export default Register
