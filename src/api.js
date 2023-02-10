export default class Exchange {
  static async getExchange(amount, code1, code2) {
    try{
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${code1}/${code2}/${amount}`);
      const jsonifiedResponse = await response.json();
      if(!response.ok) {
        if (response.status === 404) {
          const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}
          Make sure both Currency Code inputs are valid.`;
          throw new Error(errorMessage);
        }
        const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}`;
        throw new Error(errorMessage);
      }
      return jsonifiedResponse;
    } catch(error) {
      return error;
    }
  }
}