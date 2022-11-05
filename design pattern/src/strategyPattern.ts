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

const duck2 = () => {
  return {
    fly: () => {
      console.log("fly");
    },
    quack: () => {
      console.log("quack");
    },
  };
};

const test3 = duck2();
test3.quack();

//rpg 게임만들기

type Weapon = {
  att: number;
  speed: number;
} | null;

abstract class 무기 {
  name;
  att;
  speed;

  constructor(name: string, weapon: Weapon) {
    this.name = name;
    this.att = weapon?.att;
    this.speed = weapon?.speed;
  }
}
abstract class 캐릭터전직 {
  cha: 캐릭터;
  constructor(cha: 캐릭터) {
    this.cha = cha;
  }
}
abstract class 캐릭터 {
  hp: number;
  mp: number;
  att: number;
  weapon: Weapon;

  constructor() {
    this.hp = 80;
    this.mp = 20;
    this.att = 10;
    this.weapon = null;
  }

  setWeapon(weapon: Weapon) {
    this.weapon = weapon;
  }
}

class 무기구현 implements 무기 {
  name;
  att;
  speed;

  constructor(name: string, weapon: Weapon) {
    if (!name || !weapon?.att || !weapon?.speed)
      throw new Error("check weapon and name");

    this.name = name;
    this.att = weapon.att;
    this.speed = weapon.speed;
  }
}
class 캐릭터구현 implements 캐릭터 {
  hp: number;
  mp: number;
  att: number;
  weapon: Weapon;
  constructor() {
    this.hp = 100;
    this.mp = 20;
    this.att = 5;
    this.weapon = null;
  }
  setWeapon(weapon: Weapon) {
    this.weapon = weapon;
  }
}

const weapon1 = new 무기구현("정의의칼", { att: 200, speed: 2.0 });
const test34 = new 캐릭터구현();
console.log(test34);
test34.setWeapon(weapon1);
console.log(test34);
