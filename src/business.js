import Exchange from './api.js';
import { printExchange, printError } from './index.js';

export default function getAPIData(amount, isoCode) {
  Exchange.getExchange(amount, isoCode)
    .then(function(exchangeResponse) {
      console.log(exchangeResponse);
      if (!amount) {
        const errorMessage = `Please enter an amount in the first input field`;
        throw new Error(errorMessage);
      } else if (exchangeResponse instanceof Error && isoCode === "") {
        const errorMessage = `There was a problem accessing the exchange data from ExchangeRate-API for ${isoCode}: 
        Please enter a valid Currency Code.`;
        throw new Error(errorMessage);
      } else if (exchangeResponse instanceof Error) {
        const errorMessage = `There was a problem accessing the exchange data from ExchangeRate-API for ${isoCode}: 
        ${exchangeResponse}`;
        throw new Error(errorMessage);
      }
      printExchange(exchangeResponse, isoCode, amount);
    })
    .catch(function(error){
      printError(error);
    });
}