import Exchange from './api.js';
import { printExchange, printError } from './index.js';

export default function getAPIData(amount, isoCode1, isoCode2) {
  Exchange.getExchange(amount, isoCode1, isoCode2)
    .then(function(exchangeResponse) {
      if (!amount) {
        const errorMessage = `Please enter an amount in the first input field`;
        throw new Error(errorMessage);
      } else if (exchangeResponse instanceof Error && isoCode1 === "") {
        const errorMessage = `There was a problem accessing the exchange data from ExchangeRate-API for ${isoCode1}: 
        Please enter a valid Currency Code.`;
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