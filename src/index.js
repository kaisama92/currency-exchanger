import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import getAPIData from './business.js';


// UI Logic 

export function printExchange(response, isoCode, amount) {
  let rate = parseFloat(response.conversion_rate);
  let result = parseFloat(response.conversion_result);
  let text = `The conversion rate from USD to ${isoCode} is ${rate}.
  Converting your ${amount} in USD to ${isoCode} would result in ${(result).toFixed(2)} ${isoCode}.`;
  document.querySelector('#results').innerText = text;
}

export function printError(error) {
  document.querySelector('#results').innerText = error;
}
 
function handleFormSubmission(event){
  event.preventDefault();
  let amount = parseFloat(document.querySelector('#amount').value);
  let isoCode = document.querySelector('#isoCode').value.toUpperCase();
  getAPIData(amount, isoCode);
}

window.addEventListener("load", function() {
  const form = this.document.querySelector('form');
  form.addEventListener('submit', handleFormSubmission);
});