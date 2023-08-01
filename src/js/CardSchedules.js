'use strict'

import {Customers, Events, Plans, Pricer, Schedules, Strategies} from "./datastore.js";
import {Table} from "./Table.js";

export class CardSchedules extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.schedules_ = new Schedules();
    this.customers_ = new Customers();
    this.strategies_ = new Strategies();
    this.plans_ = new Plans();
    this.events_ = new Events();
    this.observers_ = new com.computablefacts.observers.Subject();
  }

  get schedules() {
    return this.schedules_;
  }

  set customers(customers) {
    this.customers_ = customers;
    this.render();
  }

  set plans(plans) {
    this.plans_ = plans;
    this.render();
  }

  set strategies(strategies) {
    this.strategies_ = strategies;
    this.render();
  }

  set events(events) {
    this.events_ = events;
    this.render();
  }

  addOrUpdateSchedule(customerName, plans) {
    this.schedules_.addOrUpdate(customerName, plans);
    this.render();
  }

  onSchedulesUpdate(callback) {
    this.observers_.register('schedules-update', () => {
      if (callback) {
        callback(this.schedules_);
      }
    });
  }

  /**
   * @override
   */
  _newElement() {

    const elCard = document.createElement('div');
    elCard.classList.add('card');
    elCard.innerHTML = `
      <div class="card-header">
        <div class="container p-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="card-title"><b>Schedules</b></h3>
            </div>
            <div class="col-auto">
              <a class="btn btn-icon bp4-align-right" href="#" data-bs-toggle="modal" data-bs-target="#modal-add-schedule">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 5l0 14"></path><path d="M5 12l14 0"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-table table-responsive">
        <!-- FILLED DYNAMICALLY -->
      </div>
      <div id="modal-add-schedule" class="modal modal-blur fade" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Schedule</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <div class="form-label">Select a single customer :</div>
                <select type="text" class="form-select" id="select-customers" value="">
                  <!-- FILLED DYNAMICALLY -->
                </select>
              </div>
              <div class="mb-3">
                <div class="form-label">Select one or more plans :</div>
                <select type="text" class="form-select" value="" multiple="multiple">
                  <!-- FILLED DYNAMICALLY -->
                </select>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Table
    const elTable = new Table(elCard.querySelector('.card-table'));
    elTable.columns = [{name: '#', attribute: 'id'}, {
      name: 'Customer', attribute: 'customer', render: row => {
        return `<span class="badge bg-blue-lt">${row.customer}</span>`;
      }
    }, {
      name: 'Plans', attribute: 'plans', render: row => {
        return row.plans.map(plan => {
          return `<span class="badge bg-blue-lt">${plan}</span>`;
        }).join(' ')
      }
    }, {
      name: 'Price (€)', attribute: null, render: row => {
        const pricer = new Pricer(this.strategies_, this.plans_, this.schedules_, this.events_);
        return pricer.price(row.customer);
      }
    }];
    elTable.rows = this.schedules_.all();

    // Init Modal
    const elSelectCustomer = elCard.querySelectorAll('#modal-add-schedule .modal-body select')[0];
    this.customers_.all().forEach(customer => {

      const elOption = document.createElement('option');
      elOption.value = customer.name;
      elOption.innerText = customer.name;

      elSelectCustomer.appendChild(elOption);
    });

    const elSelectPlan = elCard.querySelectorAll('#modal-add-schedule .modal-body select')[1];
    this.plans_.all().forEach(plan => {

      const elOption = document.createElement('option');
      elOption.value = plan.name;
      elOption.innerText = plan.name;

      elSelectPlan.appendChild(elOption);
    });

    // Create strategy
    const elBtnCreateSchedule = elCard.querySelector('#modal-add-schedule .modal-footer .btn-primary');
    elBtnCreateSchedule.onclick = (e) => {

      const getSelection = (select) => {

        const result = [];
        const options = select && select.options;
        let opt;

        for (let i = 0, iLen = options.length; i < iLen; i++) {
          opt = options[i];
          if (opt.selected) {
            result.push(opt.value || opt.text);
          }
        }
        return result;
      }

      this.addOrUpdateSchedule(getSelection(elSelectCustomer)[0], getSelection(elSelectPlan));
      this.observers_.notify('schedules-update');
    };
    return elCard;
  }
}