// berfungsi menyumpan ke localstorage
import store from "./store";
import { saveCart } from '../api/cart';

let currentAuth;
let currentCart;

function listener(){
	let previusAuth = currentAuth;
	let previousCart = currentCart;

	currentAuth = store.getState().auth;
	currentCart = store.getState().cart;

	let { token } = currentAuth;
	// console.log(token)
	// cek apakah nilai state `auth` berubah dari nilai sebelumnya
	if(currentAuth !== previusAuth){
		// jika berubah simpan ke local storage
		localStorage.setItem('auth', JSON.stringify(currentAuth))
		saveCart(token, currentCart);
	}

	if(currentCart !== previousCart){
		localStorage.setItem('cart', JSON.stringify(currentCart));
		saveCart(token, currentCart);
	}
}

function listen(){
	store.subscribe(listener)
}

export {listen}