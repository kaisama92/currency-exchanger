import Exchange from './api.js';
import { printExchange } from './index.js'
import { printError } from './index.js';

export function getAPIData(amount, isoCode) {
  Exchange.getExchange(amount, isoCode)
    .then(function(exchangeResponse) {
      if (exchangeResponse instanceof Error) {
        const errorMessage = `There was a problem accessing the exchange data from ExchangeRate-API for ${isoCode}`;
        throw new Error(errorMessage);
      }
      printExchange(exchangeResponse, isoCode, amount);
    })
    .catch(function(error){
      printError(error);
    });
  }