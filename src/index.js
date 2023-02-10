import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import getAPIData from './business.js';


// UI Logic 

export function printExchange(response, isoCode1, isoCode2, amount) {
  document.querySelector('.hidden').removeAttribute('class');
  let rate = parseFloat(response.conversion_rate);
  let result = parseFloat(response.conversion_result);
  let text = `The conversion rate from ${isoCode1} to ${isoCode2} is ${rate}.
  Converting ${amount} in ${isoCode1} to ${isoCode2} would result in ${(result).toFixed(2)} ${isoCode2}.`;
  document.querySelector('#results').innerText = text;
}

export function printError(error) {
  document.querySelector('.hidden').removeAttribute('class');
  document.querySelector('#results').innerText = error;
}

function handleFormSubmission(event){
  event.preventDefault();
  let amount = parseFloat(document.querySelector('#amount').value);
  let isoCode1 = document.querySelector('#isoCode1').value.toUpperCase();
  let isoCode2 = document.querySelector('#isoCode2').value.toUpperCase();
  getAPIData(amount, isoCode1, isoCode2);
} 

window.addEventListener("load", function() {
  const form = this.document.querySelector('form');
  form.addEventListener('submit', handleFormSubmission);
});