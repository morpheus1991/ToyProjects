abstract class Subject {
  registerObserver(observer: Observer) {}
  removeObserver(observer: Observer) {}
  notifyObservers() {}
}

abstract class Observer {
  update(temperature: number, humidity: number, pressure: number) {}
}

abstract class DisplayElement {
  display() {}
}

interface ObserverAndDisplayElement extends Observer, DisplayElement {}

class WeatherData implements Subject {
  private observers: Observer[];
  private temperature: number | null;
  private humidity: number | null;
  private pressure: number | null;
  constructor() {
    this.observers = [];
    this.temperature = null;
    this.humidity = null;
    this.pressure = null;
  }

  public registerObserver(observer: Observer) {
    this.observers = [...this.observers, observer];
  }
  public removeObserver(observer: Observer) {
    this.observers = [...this.observers.filter((observer) => observer)];
    //
  }
  public notifyObservers() {
    console.log(this.observers.length);
    this.observers.forEach((observer) => {
      const { temperature, humidity, pressure } = this;
      if (!(temperature && humidity && pressure)) throw new Error("dd");
      observer.update(temperature!, humidity!, pressure!);
    });
  }

  public measurementsChanged() {
    this.notifyObservers();
    // this.currentConditionDisplay.update(temp, humidity, pressure);
    // this.staticDisplay.update(temp, humidity, pressure);
    // this.forecastDisplay.update(temp, humidity, pressure);
  }
  public setMeasurements(
    temperature: number,
    humidity: number,
    pressure: number
  ) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementsChanged();
  }
}
class CurrentConditionsDisplay implements ObserverAndDisplayElement {
  private temperature: number | null;
  private humidity: number | null;
  private pressure: number | null;
  private weatherData: Subject;
  constructor(weatherData: Subject) {
    this.weatherData = weatherData;
    this.temperature = null;
    this.humidity = null;
    this.pressure = null;
  }
  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }
  currentConditionDisplay(weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }
  display() {
    console.log(
      `현재 상태 : 온도 ${this.temperature}F, 습도 ${this.humidity}%`
    );
  }
}

class StaticsDisplay implements ObserverAndDisplayElement {
  private temperature: number | null;
  private humidity: number | null;
  private pressure: number | null;
  private weatherData: Subject;
  constructor(weatherData: Subject) {
    this.weatherData = weatherData;
    this.temperature = null;
    this.humidity = null;
    this.pressure = null;
  }

  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }
  currentConditionDisplay(weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }
  display() {
    console.log(
      `현재 상태 : 온도 ${this.temperature}F, 습도 ${this.humidity}%`
    );
  }
}

class ForecastDisplay implements ObserverAndDisplayElement {
  private temperature: number | null;
  private humidity: number | null;
  private pressure: number | null;
  private weatherData: Subject;
  constructor(weatherData: Subject) {
    this.weatherData = weatherData;
    this.temperature = null;
    this.humidity = null;
    this.pressure = null;
  }
  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }
  currentConditionDisplay(weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }
  display() {
    console.log(
      `현재 상태 : 온도 ${this.temperature}F, 습도 ${this.humidity}%`
    );
  }
}

class ThirdPartyDisplay implements ObserverAndDisplayElement {
  private temperature: number | null;
  private humidity: number | null;
  private pressure: number | null;
  private weatherData: Subject;
  constructor(weatherData: Subject) {
    this.weatherData = weatherData;
    this.temperature = null;
    this.humidity = null;
    this.pressure = null;
  }
  update(temperature: number, humidity: number, pressure: number): void {
    this.temperature = temperature;
    this.humidity = humidity;
    this.display();
  }
  currentConditionDisplay(weatherData: Subject) {
    this.weatherData = weatherData;
    weatherData.registerObserver(this);
  }
  display() {
    console.log(
      `현재 상태 : 온도 ${this.temperature}F, 습도 ${this.humidity}%`
    );
  }
}

const test = new WeatherData();
const staticsDisplay = new StaticsDisplay(test);

test.registerObserver(staticsDisplay);
test.setMeasurements(23, 34, 23);
