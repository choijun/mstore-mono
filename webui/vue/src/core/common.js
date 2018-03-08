class CommonService {
  constructor() {
    this.toCurrency = amount => ('$ ' + (amount / 100).toFixed(2));
  }
}

export default new CommonService();