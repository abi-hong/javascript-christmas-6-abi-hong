import Order from "./controller/Order.js";

class App {
  order = new Order();
  
  async run() {
    this.order.start();
  }
}

export default App;
