
import './css/styles.css';



// UI Logic 

function handleFormSubmission(event){
  event.preventDefault();
  let amount = parseFloat(document.querySelector('#amount').value);
  let isoCode = document.querySelector('#isoCode').value;
  getExchange(amount, isoCode);
}




window.addEventListener("load", function() {
  const form = this.document.querySelector('form');
  form.addEventListener('submit', handleFormSubmission);
})
