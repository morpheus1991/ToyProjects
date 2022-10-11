abstract class FlyBehavior {
  fly() {}
}

abstract class QuackBehavior {
  quack() {}
}
class Duck {
  private flyBehavior;
  private quackBehavior;
  constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
    this.flyBehavior = flyBehavior;
    this.quackBehavior = quackBehavior;
  }

  public fly() {
    this.flyBehavior.fly();
  }
  public quack() {
    this.quackBehavior.quack();
  }
}

class FlyWithWings implements FlyBehavior {
  fly() {
    console.log("fly");
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    console.log("못날음");
  }
}

class Quack implements QuackBehavior {
  quack() {
    console.log("quack");
  }
}

class Squack implements QuackBehavior {
  quack() {
    console.log("Squack");
  }
}

class MuteQuack implements QuackBehavior {
  quack() {
    console.log("MuteQuack");
  }
}

const duck = new Duck(new FlyWithWings(), new MuteQuack());

duck.fly();
