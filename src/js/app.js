'use strict'

import {Customers, Events, Features, Plans, Pricer, Schedules, Strategies} from "./datastore.js";
import {CardCustomers} from "./CardCustomers.js";
import {CardFeatures} from "./CardFeatures.js";
import {CardStrategies} from "./CardStrategies.js";
import {CardPlans} from "./CardPlans.js";
import {CardSchedules} from "./CardSchedules.js";

export class App {

  constructor() {
  }

  /**
   * Display the app.
   *
   * @param {string} elementId the parent element id.
   */
  init(elementId) {

    const container = document.getElementById(elementId);
    container.innerHTML = `
      <style>
        /* TODO : ADD PAGE-SPECIFIC CSS HERE */
      </style>
      <div id="app-body" class="page">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="container-xl">
              <div class="row row-deck row-cards">
                <div id="card-schedules" class="col">
                  <!-- FILLED DYNAMICALLY -->
                </div>
              </div>
              <div class="row row-deck row-cards" style="margin-top: var(--tblr-gutter-y)">
                <div id="card-plans" class="col">
                  <!-- FILLED DYNAMICALLY -->
                </div>
              </div>
              <div class="row row-deck row-cards" style="margin-top: var(--tblr-gutter-y)">
                <div id="card-strategies" class="col">
                  <!-- FILLED DYNAMICALLY -->
                </div>
              </div>
              <div class="row row-deck row-cards" style="margin-top: var(--tblr-gutter-y)">
                <div id="card-customers" class="col-6">
                  <!-- FILLED DYNAMICALLY -->
                </div>
                <div id="card-features" class="col-6">
                  <!-- FILLED DYNAMICALLY -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // PoC
    this._meteringAndBillingPoC();

    // Init the 'Customers Schedules' card
    const elCardSchedules = container.querySelector('#card-schedules');
    const elSchedules = new CardSchedules(elCardSchedules);

    // Init the 'Strategies' card
    const elCardStrategies = container.querySelector('#card-strategies');
    const elStrategies = new CardStrategies(elCardStrategies);
    elStrategies.onStrategiesUpdate(strategies => elPlans.strategies = strategies);

    // Init the 'Customers' card
    const elCardCustomers = container.querySelector('#card-customers');
    const elCustomers = new CardCustomers(elCardCustomers);
    elCustomers.onCustomersUpdate(customers => elSchedules.customers = customers);

    // Init the 'Features' card
    const elCardFeatures = container.querySelector('#card-features');
    const elFeatures = new CardFeatures(elCardFeatures);
    elFeatures.onFeaturesUpdate(features => elStrategies.features = features);

    // Init the 'Plans' card
    const elCardPlans = container.querySelector('#card-plans');
    const elPlans = new CardPlans(elCardPlans);
    elPlans.onPlansUpdate(plans => elSchedules.plans = plans);

    // Create fake data
    elCustomers.addCustomer('ACME Inc.');
    elFeatures.addOrUpdateFeature('user-created');
    elPlans.addOrUpdatePlan('Plan n°1', 'Summing Strategy', null, null);
    elPlans.addOrUpdatePlan('Plan n°2', 'Multiplying Strategy', null, null);
    elStrategies.addOrUpdateStrategy('Summing Strategy', ['user-created'], (events) => {
      return events.reduce((prev, cur) => prev + cur.amount, 0);
    });
    elStrategies.addOrUpdateStrategy('Multiplying Strategy', ['user-created'], (events) => {
      return events.reduce((prev, cur) => prev * cur.amount, 1);
    });
    elSchedules.addOrUpdateSchedule('ACME Inc.', ['Plan n°1', 'Plan n°2']);

    // Init components with fake data
    elStrategies.features = elFeatures.features;
    elPlans.strategies = elStrategies.strategies;
    elSchedules.customers = elCustomers.customers;
    elSchedules.plans = elPlans.plans;
  }

  _meteringAndBillingPoC() {

    const customers = new Customers();
    customers.addOrUpdate('ACME Inc.');

    const features = new Features();
    features.addOrUpdate('nb_connections');

    const strategies = new Strategies();
    strategies.addOrUpdate('sum', ['nb_connections'], (events) => {
      return events.reduce((prev, cur) => prev + cur.amount, 0)
    });
    strategies.addOrUpdate('mul', ['nb_connections'], (events) => {
      return events.reduce((prev, cur) => prev * cur.amount, 1)
    });

    const plans = new Plans();
    plans.addOrUpdate('Plan n°1', 'sum', null, null);
    plans.addOrUpdate('Plan n°2', 'mul', null, null);

    const schedule = new Schedules();
    schedule.addOrUpdate('ACME Inc.', ['Plan n°1', 'Plan n°2']);

    const events = new Events();
    events.add('ACME Inc.', 'nb_connections', 1);
    events.add('ACME Inc.', 'nb_connections', 1);
    events.add('ACME Inc.', 'nb_connections', 1);

    const pricer = new Pricer(customers, features, strategies, plans, schedule, events);
    const sum1 = pricer.price('ACME Inc.');
    const sum2 = pricer.price('ACME Inc.', ['Plan n°2']);
    const sum3 = pricer.price('ACME Inc.', ['Plan n°1']);
    const sum4 = pricer.price('ACME Inc.', ['Plan n°1', 'Plan n°2']);

    console.log('[S1] sum price is ' + sum1 + ' (expected=4)');
    console.log('[S2] sum price is ' + sum2 + ' (expected=1)');
    console.log('[S3] sum price is ' + sum3 + ' (expected=3)');
    console.log('[S4] sum price is ' + sum4 + ' (expected=4)');
  }
}