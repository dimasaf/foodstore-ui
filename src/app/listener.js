import store from "./store";

let currentAuth;

function listener(){
	let previusAuth = currentAuth;

	currentAuth = store.getState().auth;

	// cek apakah nilai state `auth` berubah dari nilai sebelumnya
	if(currentAuth !== previusAuth){
		// jika berubah simpan ke local storage
		localStorage.setItem('auth', JSON.stringify(currentAuth))
	}
}

function listen(){
	store.subscribe(listener)
}


export {listen}