'use strict'

import {CardCustomers} from "./CardCustomers.js";
import {CardFeatures} from "./CardFeatures.js";
import {CardStrategies} from "./CardStrategies.js";
import {CardPlans} from "./CardPlans.js";
import {CardSchedules} from "./CardSchedules.js";
import {CardEvents} from "./CardEvents.js";

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
                <div id="card-events" class="col">
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

    // Init the 'Events' card
    const elCardEvents = container.querySelector('#card-events');
    const elEvents = new CardEvents(elCardEvents);

    // Create fake data
    elCustomers.addCustomer('ACME Inc.');
    elFeatures.addOrUpdateFeature('nb_connections');
    elPlans.addOrUpdatePlan('Plan n°1', 'Summing Strategy', null, null);
    elPlans.addOrUpdatePlan('Plan n°2', 'Multiplying Strategy', null, null);
    elStrategies.addOrUpdateStrategy('Summing Strategy', ['nb_connections'], (events) => {
      return events.reduce((prev, cur) => prev + cur.amount, 0);
    });
    elStrategies.addOrUpdateStrategy('Multiplying Strategy', ['nb_connections'], (events) => {
      return events.reduce((prev, cur) => prev * cur.amount, 1);
    });
    elSchedules.addOrUpdateSchedule('ACME Inc.', ['Plan n°1', 'Plan n°2']);
    this._createRandomEvents(elCustomers, elFeatures, elEvents);

    // Init components with fake data
    elStrategies.features = elFeatures.features;
    elPlans.strategies = elStrategies.strategies;
    elSchedules.customers = elCustomers.customers;
    elSchedules.plans = elPlans.plans;
    elSchedules.strategies = elStrategies.strategies;
    elSchedules.events = elEvents.events;
  }

  _createRandomEvents(elCustomers, elFeatures, elEvents) {

    elEvents.addEvent(new Date(), 'ACME Inc.', 'nb_connections', 1);
    elEvents.addEvent(new Date(), 'ACME Inc.', 'nb_connections', 1);
    elEvents.addEvent(new Date(), 'ACME Inc.', 'nb_connections', 1);

  }
}