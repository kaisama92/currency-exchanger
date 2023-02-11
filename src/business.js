import Exchange from './api.js';
import { printExchange, printError, printSession } from './index.js';

export function getAPIData(amount, isoCode1, isoCode2) {
  Exchange.getExchange(amount, isoCode1, isoCode2)
    .then(function(exchangeResponse) {
      if (isoCode1 === "") {
        const errorMessage = `Please enter a valid Currency Code in Code 1 input`;
        throw new Error(errorMessage);
      } else if (isoCode2 === "") {
        const errorMessage = `Please enter a valid Currency Code in Code 2 input`;
        throw new Error(errorMessage);
      } else if (!amount) {
        const errorMessage = `Please enter an amount in the second input field`;
        throw new Error(errorMessage);
      } else if (exchangeResponse instanceof Error) {
        const errorMessage = `There was a problem accessing the exchange data from ExchangeRate-API for ${isoCode1}: 
        ${exchangeResponse}`;
        throw new Error(errorMessage);
      }
      printExchange(exchangeResponse, isoCode1, isoCode2, amount);
    })
    .catch(function(error){
      printError(error);
    });
}

export function getSessionData(amount, isoCode1, isoCode2) {
  let data = sessionStorage.getItem("apiOutput");
  if (isoCode1 === "USD") {
    if (isoCode2 in data) {
      let result = amount * data.isoCode2;
      printSession(amount, isoCode1, isoCode2, result);
    } else {
      let errorMessage = `Please enter a valid Currency Code in last input field.`;
      printError(errorMessage);
    }
  } else if (isoCode2 === "USD") {
    if (isoCode1 in data) {
      let result = amount / data.isocode1;
      printSession(amount, isoCode1, isoCode2, result);
    } else {
      let errorMessage = `Please enter a valid Currency Code in first input field.`;
      printError(errorMessage);
    }
  }
}