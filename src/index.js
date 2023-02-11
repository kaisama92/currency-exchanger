import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import { getAPIData, getSessionData } from './business.js';


// UI Logic 

export function printExchange(response, isoCode1, isoCode2, amount) {
  if (document.querySelector('#results').hasAttribute('class')) {
    document.querySelector('#results').removeAttribute('class');
  }
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

function handleInitialFormSubmission(event){
  event.preventDefault();
  document.querySelector('#submit').setAttribute('class', 'hidden');
  document.querySelector('#resubmit').removeAttribute('class');
  let amount = parseFloat(document.querySelector('#amount').value);
  let isoCode1 = document.querySelector('#isoCode1').value.toUpperCase();
  let isoCode2 = document.querySelector('#isoCode2').value.toUpperCase();
  getAPIData(amount, isoCode1, isoCode2);
} 

function handleSubsequentFormSubmissions(event){
  event.preventDefault();
  let amount = parseFloat(document.querySelector('#amount').value);
  let isoCode1 = document.querySelector('#isoCode1').value.toUpperCase();
  let isoCode2 = document.querySelector('#isoCode2').value.toUpperCase();
  getSessionData(amount, isoCode1, isoCode2);
}

window.addEventListener("load", function() {
  const form = this.document.querySelector('form');
  form.addEventListener('submit', handleInitialFormSubmission);
  const resubmit = this.document.querySelector('#resubmit');
  resubmit.addEventListener('click', handleSubsequentFormSubmissions)
});