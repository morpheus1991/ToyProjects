abstract class FlyBehavior {
  fly() {}
}

abstract class QuackBehavior {
  quack() {}
}

abstract class Duck {
  constructor(
    protected flyBehavior: FlyBehavior,
    protected quackBehavior: QuackBehavior
  ) {
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

class NomalDuck extends Duck {
  constructor(flyBehavior: FlyBehavior, quackBehavior: QuackBehavior) {
    super(flyBehavior, quackBehavior);
  }
  fly() {
    this.flyBehavior.fly();
  }
  quack() {
    this.quackBehavior.quack();
  }
}
const nomalduck = new NomalDuck(new FlyNoWay(), new MuteQuack());
const wingDuck = new NomalDuck(new FlyWithWings(), new Quack());

nomalduck.fly();
nomalduck.quack();

wingDuck.fly();
wingDuck.quack();

class Duck2 {
  private flyFunction;
  private quackFunction;
  constructor(fly: Function, quack: Function) {
    this.flyFunction = fly;
    this.quackFunction = quack;
  }
  fly() {
    this.flyFunction();
    console.log("fly");
  }
  quack() {
    this.quackFunction();
    console.log("quack");
  }
}
