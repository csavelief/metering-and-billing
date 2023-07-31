'use strict'

import {Customers, CustomerSchedule, Events, Features, Plans, Pricer, Prices, Strategies} from "./datastore.js";
import {CardCustomers} from "./CardCustomers.js";
import {CardFeatures} from "./CardFeatures.js";

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

    // Init the Customers card
    const elCardCustomers = container.querySelector('#card-customers');
    const cardCustomers = new CardCustomers(elCardCustomers);
    cardCustomers.addCustomer('ACME Inc.');

    // Init the Features card
    const elCardFeatures = container.querySelector('#card-features');
    const cardFeatures = new CardFeatures(elCardFeatures);
    cardFeatures.addOrUpdateFeature('user-created');
    cardFeatures.addOrUpdateFeature('user-deleted');
    cardFeatures.addOrUpdateFeature('user-created1');
    cardFeatures.addOrUpdateFeature('user-deleted2');
    cardFeatures.addOrUpdateFeature('user-created3');
    cardFeatures.addOrUpdateFeature('user-deleted4');
    cardFeatures.addOrUpdateFeature('user-created5');
    cardFeatures.addOrUpdateFeature('user-deleted6');
    cardFeatures.addOrUpdateFeature('user-created7');
    cardFeatures.addOrUpdateFeature('user-deleted8');
    cardFeatures.addOrUpdateFeature('user-created9');
    cardFeatures.addOrUpdateFeature('user-deleted10');
    cardFeatures.addOrUpdateFeature('user-created11');
    cardFeatures.addOrUpdateFeature('user-deleted12');
    cardFeatures.addOrUpdateFeature('user-created13');
    cardFeatures.addOrUpdateFeature('user-deleted14');
    cardFeatures.addOrUpdateFeature('user-created15');
    cardFeatures.addOrUpdateFeature('user-deleted16');

    // TODO
  }

  _meteringAndBillingPoC() {

    const customers = new Customers();
    customers.add('jdoe@example.com');

    const features = new Features();
    features.addOrUpdate('nb_connections');

    const prices = new Prices();
    prices.addOrUpdate('1 cent', 'nb_connections', 1);

    const strategies = new Strategies();
    strategies.addOrUpdate('sum', (events, price) => events.reduce((prev, cur) => prev + (cur.amount * price), 0));
    strategies.addOrUpdate('mul', (events, price) => events.reduce((prev, cur) => prev * (cur.amount * price), 1));

    const plans = new Plans();
    plans.addOrUpdate('Plan n°1', 'sum', '1 cent', null, null);
    plans.addOrUpdate('Plan n°2', 'mul', '1 cent', null, null);

    const schedule = new CustomerSchedule('jdoe@example.com');
    schedule.add('Plan n°1');
    schedule.add('Plan n°2');

    const events = new Events();
    events.add('jdoe@example.com', 'nb_connections', 1);
    events.add('jdoe@example.com', 'nb_connections', 1);
    events.add('jdoe@example.com', 'nb_connections', 1);

    const pricer = new Pricer(customers, features, prices, strategies, plans, [schedule], events);
    const sum1 = pricer.price('jdoe@example.com');
    const sum2 = pricer.price('jdoe@example.com', ['Plan n°2']);
    const sum3 = pricer.price('jdoe@example.com', ['Plan n°1']);
    const sum4 = pricer.price('jdoe@example.com', ['Plan n°1', 'Plan n°2']);

    console.log('[S1] sum price is ' + sum1 + ' (expected=4)');
    console.log('[S2] sum price is ' + sum2 + ' (expected=1)');
    console.log('[S3] sum price is ' + sum3 + ' (expected=3)');
    console.log('[S4] sum price is ' + sum4 + ' (expected=4)');
  }
}