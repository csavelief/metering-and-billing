'use strict'

/**
 * A list of customers.
 */
export class Customers {

  constructor() {
    this.customers_ = [];
  }

  all() {
    return this.customers_;
  }

  get(name) {
    return this.customers_.find(c => c.name === name);
  }

  add(name) {

    let customer = this.get(name);

    if (customer) {
      return customer;
    }

    customer = {
      id: this.customers_.length + 1, name: name,
    };

    this.customers_.push(customer);
    return customer;
  }
}

/**
 * A list of features that can be taken into account in our pricing model.
 */
export class Features {

  constructor() {
    this.features_ = [];
  }

  all() {
    return this.features_;
  }

  get(name) {
    return this.features_.find(f => f.name === name);
  }

  addOrUpdate(name) {

    let feature = this.get(name);

    if (feature) {
      return feature;
    }

    feature = {
      id: this.features_.length + 1, name: name
    };

    this.features_.push(feature);
    return feature;
  }
}

/**
 * A strategy takes a list of features and returns a price.
 */
export class Strategies {

  constructor() {
    this.strategies_ = [];
  }

  all() {
    return this.strategies_;
  }

  get(name) {
    return this.strategies_.find(p => p.name === name);
  }

  // fnStrategy(the app-generated events)
  addOrUpdate(name, features, fnStrategy) {

    let strategy = this.get(name);

    if (strategy) {
      strategy.name = name;
      strategy.features = features;
      strategy.strategy = fnStrategy;
      return strategy;
    }

    strategy = {
      id: this.strategies_.length + 1, name: name, features: features, strategy: fnStrategy
    };

    this.strategies_.push(strategy);
    return strategy;
  }
}

/**
 * A plan restricts a strategy to a given feature's price and range of events.
 */
export class Plans {

  constructor() {
    this.plans_ = [];
  }

  all() {
    return this.plans_;
  }

  get(name) {
    return this.plans_.find(p => p.name === name);
  }

  addOrUpdate(name, strategyName, beginYyyyMmDd, endYyyyMmDd) {

    let plan = this.get(name);

    if (plan) {
      plan.name = name;
      plan.strategy = strategyName;
      plan.begin = beginYyyyMmDd;
      plan.end = endYyyyMmDd;
      return plan;
    }

    const getDate = (date) => {
      if (!date) {
        return null;
      }
      const offset = date.getTimezoneOffset();
      const newDate = new Date(date.getTime() - (offset * 60 * 1000));
      return newDate.toISOString().split('T')[0];
    };

    plan = {
      id: this.plans_.length + 1,
      name: name,
      strategy: strategyName,
      begin: !beginYyyyMmDd ? getDate(new Date()) : beginYyyyMmDd,
      end: endYyyyMmDd
    };

    this.plans_.push(plan);
    return plan;
  }

  sunset(name, end) {

    const plan = this.get(name);

    if (plan && !plan.end) {
      plan.end = !end ? new Date().getTime() : end;
    }
  }
}

/**
 * The plans subscribed by a given customer.
 */
export class CustomerSchedule {

  constructor(customerName) {
    this.customer_ = customerName;
    this.plans_ = [];
  }

  customer() {
    return this.customer_;
  }

  plans() {
    const timestamp = new Date().getTime();
    return this.plans_.filter(p => timestamp >= p.begin && (!p.end || timestamp <= p.end));
  }

  add(planName, begin, end) {

    let plan = this.plans_.find(p => p.name === planName);

    if (plan) {
      return plan;
    }

    plan = {
      id: this.plans_.length + 1, plan: planName, begin: !begin ? new Date().getTime() : begin, end: end
    };

    this.plans_.push(plan);
    return plan;
  }

  sunset(planName, end) {

    const plan = this.plans_.find(p => p.name === planName && !p.end);

    if (plan && !plan.end) {
      plan.end = !end ? new Date().getTime() : end;
    }
  }
}

/**
 * A list of app-generated events.
 */
export class Events {

  constructor() {
    this.events_ = [];
  }

  all() {
    return this.events_;
  }

  get(customer, features) {
    return this.events_.filter(e => e.customer === customer && features.indexOf(e.feature) >= 0);
  }

  add(customerName, featureName, amount) {

    const event = {
      id: this.events_.length + 1,
      timestamp: new Date().getTime(),
      customer: customerName,
      feature: featureName,
      amount: amount
    };

    this.events_.push(event);
    return event;
  }
}

export class Pricer {

  constructor(customers, features, strategies, plans, schedules, events) {
    this.customers_ = customers;
    this.features_ = features;
    this.strategies_ = strategies;
    this.plans_ = plans;
    this.schedules_ = schedules;
    this.events_ = events;
  }

  price(customerName, plans) {
    return this.schedules_.filter(schedule => schedule.customer() === customerName)
    .flatMap(schedule => {
      return schedule.plans().filter(p => !plans || plans.indexOf(p.plan) >= 0).map(p => {

        const plan = this.plans_.get(p.plan);
        const strategy = this.strategies_.get(plan.strategy);
        const begin = new Date(plan.begin).getTime();
        const end = new Date(plan.end).getTime();
        const events = this.events_.get(customerName, strategy.features).filter(
            e => (!begin || e.timestamp >= begin) && (!end || e.timestamp <= end));

        return strategy.strategy(events);
      });
    }).reduce((prev, cur) => prev + cur, 0);
  }
}