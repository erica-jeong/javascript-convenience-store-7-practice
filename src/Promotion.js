class Promotion {
  constructor(name, buy, get, startDate, endDate) {
    this.name = name;
    this.buy = Number(buy);
    this.get = Number(get);
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
  }
}

export default Promotion;