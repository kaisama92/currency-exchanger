export default class Exchange {
  static async getExchange(amount, code) {
    try{
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${code}/${amount}`);
      const jsonifiedResponse = await response.json();
      if(!response.ok) {
        if (response.status === 404) {
          const errorMessage = `${response.status} ${response.statusText} ${jsonifiedResponse.message}
          ${code} is not a valid Currency Code.`;
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