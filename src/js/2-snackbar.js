import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", createPromise);
function createPromise(event) {
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(`✅ Fulfilled promise in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise in ${delay}ms`)
            }
        }, delay);
    });
    promise
        .then((result) => {
            iziToast.show({
                message: `${result}`,
                position: 'topRight',
                color:'green',

});
        })
        .catch((error) => {
            iziToast.show({
                message: `${error}`,
                position: 'topRight',
                color:'red',

});
        });
    form.reset();
}





