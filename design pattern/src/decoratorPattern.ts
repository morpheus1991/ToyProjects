type Size = "TALL" | "GRANDE" | "VENTI";
abstract class Beberage {
  description = "제목없음";
  size: Size = "TALL";
  getDescription() {
    return this.description;
  }
  setSize(size: Size) {
    this.size = size;
  }
  getSize() {
    return this.size;
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
    return this.beberage.description;
  }

  cost() {
    return this.beberage.cost() + 0;
  }
}

class Espresso implements Beberage {
  description: string;
  size: Size;
  constructor(size: Size = "TALL") {
    this.description = "에스프레소";
    this.size = size;
  }
  getDescription() {
    return this.description;
  }
  setSize(size: Size) {
    this.size = size;
  }
  getSize() {
    return this.size;
  }
  cost() {
    switch (this.size) {
      case "TALL":
        return 1.99;
      case "GRANDE":
        return 2.2;
      case "VENTI":
        return 2.5;
    }
  }
}

class HouseBlend implements Beberage {
  description: string;
  size: Size;

  constructor(size: Size = "TALL") {
    this.description = "하우스 블렌드 커피";

    this.size = size;
  }

  getDescription() {
    return this.description;
  }
  setSize(size: Size) {
    this.size = size;
  }
  getSize() {
    return this.size;
  }
  cost() {
    switch (this.size) {
      case "TALL":
        return 1.99;
      case "GRANDE":
        return 2.2;
      case "VENTI":
        return 2.5;
    }
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
    return this.beberage.cost() + 0.4;
  }
}

class StarbuzzCoffee {
  beberage: Beberage;
  constructor() {
    this.beberage = new Espresso("VENTI");
    this.beberage = new Mocha(this.beberage);
    this.beberage = new Mocha(this.beberage);
    console.log(`${this.beberage.getDescription()} ${this.beberage.cost()}`);
  }
}

const test2 = new StarbuzzCoffee();
