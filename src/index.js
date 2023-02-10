
import './css/styles.css';



// UI Logic 


window.addEventListener("load", function() {
  const form = this.document.querySelector('form');
  form.addEventListener('submit', handleSubmitForm);
})