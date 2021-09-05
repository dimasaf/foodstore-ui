import * as React from 'react';
import axios from 'axios';
import { number, oneOf, oneOfType, string, shape, func } from 'prop-types';
import {Select} from 'upkit';

import { config } from '../../config';

function SelectWilayah({tingkat, kodeInduk, onChange, value}) {
	let [ data, setData] = React.useState([]);
	let [isFetching, setIsFetching] = React.useState(false);

	React.useEffect(() =>{

		setIsFetching(true);

		axios.get(`${config.api_host}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
			.then(({data}) =>  {
			    if(!data.error){
					setData(data)
				}
			 })
			.finally(_ => setIsFetching(false))

		// console.log(data)
	}, [kodeInduk, tingkat])

	return	<Select
				options={data.map(wilayah => ({label: wilayah.nama, value: wilayah.kode}))}
				onChange={onChange}
				value={value}
				isLoading={isFetching}
				isDisabled={isFetching || !data.length}
			/>

}

export default SelectWilayah

SelectWilayah.defaultProps = {
	tingkat: 'provinsi'
}
SelectWilayah.propTypes = {
	tingkat: oneOf(['provinsi', 'kabupaten', 'kecamatan', 'desa']),
	kodeInduk: oneOfType([number, string]),
	onChange: func,
	value: shape({label: string, value: oneOfType([string, number])})
}
