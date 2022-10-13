abstract class Beberage {
  description = "제목없음";
  getDescription() {
    return this.description;
  }

  cost() {
    return 0;
  }
}

abstract class CondimentDecorator extends Beberage {
  beberage: Beberage;
  constructor(beberage: Beberage) {
    super();
    this.beberage = beberage;
  }
  getDescription(): string {
    return "";
  }
}

class Espresso implements Beberage {
  description: string;
  constructor() {
    this.description = "에스프레소";
  }
  getDescription() {
    return this.description;
  }
  cost() {
    return 1.99;
  }
}

class HouseBlend implements Beberage {
  description: string;
  constructor() {
    this.description = "하우스 블렌드 커피";
  }
  getDescription() {
    return this.description;
  }
  cost() {
    return 1.99;
  }
}

class Mocha extends Beberage implements CondimentDecorator {
  beberage: Beberage;
  constructor(beberage: Beberage) {
    super();
    this.beberage = beberage;
  }

  getDescription(): string {
    return `${this.beberage.getDescription()}, 모카`;
  }

  cost() {
    return this.beberage.cost() + 0.2;
  }
}

class StarbuzzCoffee {
  beberage: Beberage;
  constructor() {
    this.beberage = new Espresso();
    this.beberage = new Mocha(this.beberage);
    this.beberage = new Mocha(this.beberage);
    console.log(`${this.beberage.getDescription()} ${this.beberage.cost()}`);
  }
}

const test2 = new StarbuzzCoffee();
