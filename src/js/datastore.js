'use strict'

const getDate = (date) => {
  if (!date) {
    return null;
  }
  const offset = date.getTimezoneOffset();
  const newDate = new Date(date.getTime() - (offset * 60 * 1000));
  return newDate.toISOString().split('T')[0];
};

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

  addOrUpdate(name) {

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
      plan.strategy = strategyName;
      plan.begin = beginYyyyMmDd;
      plan.end = endYyyyMmDd;
      return plan;
    }

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
 * The plans subscribed by all customers.
 */
export class Schedules {

  constructor() {
    this.schedules_ = [];
  }

  all() {
    return this.schedules_;
  }

  get(customerName) {
    return this.schedules_.find(s => s.customer === customerName);
  }

  addOrUpdate(customerName, plans) {

    let schedule = this.schedules_.find(s => s.customer === customerName);

    if (schedule) {
      schedule.plans = plans;
      return schedule;
    }

    schedule = {
      id: this.schedules_.length + 1, customer: customerName, plans: plans
    };

    this.schedules_.push(schedule);
    return schedule;
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

  add(timestamp, customerName, featureName, amount) {

    const event = {
      id: this.events_.length + 1, timestamp: timestamp, customer: customerName, feature: featureName, amount: amount
    };

    this.events_.push(event);
    return event;
  }
}

export class Pricer {

  constructor(strategies, plans, schedules, events) {
    this.strategies_ = strategies;
    this.plans_ = plans;
    this.schedules_ = schedules;
    this.events_ = events;
  }

  price(customerName, plans) {

    const dateYyyyMmDd = getDate(new Date());
    const schedule = this.schedules_.get(customerName);
    return !schedule ? 0 : schedule.plans.filter(p => !plans || plans.indexOf(p) >= 0).filter(planName => {

      // Ensure the plan has not been sunset...
      const plan = this.plans_.get(planName);
      const strategy = plan ? this.strategies_.get(plan.strategy) : null;
      return strategy && plan && (!plan.begin || plan.begin <= dateYyyyMmDd) && (!plan.end || dateYyyyMmDd <= plan.end);
    }).map(planName => {

      const plan = this.plans_.get(planName);
      const strategy = this.strategies_.get(plan.strategy);
      const begin = plan.begin;
      const end = plan.end;
      const events = this.events_.get(customerName, strategy.features).filter(
          e => (!begin || begin <= getDate(e.timestamp)) && (!end || getDate(e.timestamp) <= end));

      return strategy.strategy(events);
    }).reduce((prev, cur) => prev + cur, 0);
  }
}