import React from 'react'
import {useForm} from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { createAddress } from '../../api/delivery-address';

import SelectWilayah from '../../component/SelectWilayah';
import { rules } from './validation'

function UserAddressAdd() {
	let history = useHistory();
	let { handleSubmit, register, errors, setValue, watch, getValues } = useForm();

	return (
		<div>
			tezx
		</div>
	)
}

export default UserAddressAdd
