import React from 'react'
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { LayoutOne, InputText, FormControl, Textarea, Button } from 'upkit';

import { createAddress } from '../../api/delivery-address';

import TopBar from '../../component/TopBar';
import SelectWilayah from '../../component/SelectWilayah';
import { rules } from './validation'

function UserAddressAdd() {
	let history = useHistory();
	let { handleSubmit, register, formState: { errors }, setValue, watch, getValues } = useForm();

	let allFields = watch();

	const  updateValue = (field, value) => setValue(field, value, {shouldValidate: true, shouldDirty: true});

	React.useEffect(() => {
		setValue('kabupaten', null);
		setValue('kecamatan', null);
		setValue('kelurahan', null);
	}, [allFields.provinsi, setValue])

	React.useEffect(() => {
		setValue('kecamatan', null);
		setValue('kelurahan', null);
	}, [allFields.kabupaten, setValue])

	React.useEffect(() => {
		setValue('kelurahan', null);
	}, [allFields.kecamatan, setValue])

	const onSubmit = async formData => {
		let payload = {
			nama: formData.nama_alamat,
			provinsi: formData.provinsi.label,
			kabupaten: formData.kabupaten.label,
			kecamatan: formData.kecamatan.label,
			kelurahan: formData.kelurahan.label,
			detail: formData.detail_alamat
		};

		let { data } = await createAddress(payload)

		if(data.error) return;

		history.push('/alamat-pengiriman');

	}

	return (
		<LayoutOne>
			<TopBar/>
			<br />
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormControl label="Nama Alamat" color="black" errorMessage={errors.nama_alamat?.message}>
						<InputText
							fitContainer
							placeholder="Nama Alamat"
							name="nama_alamat"
							{...register("nama_alamat", rules.nama_alamat )}
						/>
					</FormControl>
					<FormControl label="Provinsi" color="black" errorMessage={errors.provinsi?.message}>
						<SelectWilayah
							name="provinsi"
							onChange = {option => updateValue('provinsi', option)}
							value={getValues().provinsi}
						/>
					</FormControl>
					<FormControl label="Kabupaten/Kota" color="black" errorMessage={errors.kabupaten?.message}>
						<SelectWilayah
							tingkat="kabupaten"
							kodeInduk={getValues().provinsi?.value}
							onChange = {option => updateValue('kabupaten', option)}
							value={getValues().kabupaten}
						/>
					</FormControl>
					<FormControl label="Kecamatan" color="black" errorMessage={errors.kecamatan?.message}>
						<SelectWilayah
							tingkat="kecamatan"
							kodeInduk={getValues().kabupaten?.value}
							onChange = {option => updateValue('kecamatan', option)}
							value={getValues().kecamatan}
						/>
					</FormControl>
					<FormControl label="Kelurahan" color="black" errorMessage={errors.kelurahan?.message}>
						<SelectWilayah
							tingkat="desa"
							kodeInduk={getValues().kecamatan?.value}
							onChange = {option => updateValue('kelurahan', option)}
							value={getValues().kelurahan}
						/>
					</FormControl>
					<FormControl label="Detail alamat" errorMessage={errors.detail_alamat?.message} color="black">
						<Textarea
						placeholder="Detail alamat"
						fitContainer
						name="detail_alamat"
						{...register("detail_alamat", rules.detail_alamat )}
						/>
					</FormControl>
					<Button fitContainer >
						Simpan
					</Button>
				</form>
			</div>
		</LayoutOne>
	)
}

export default UserAddressAdd
