'use strict'

import {Plans, Strategies} from "./datastore.js";
import {Table} from "./Table.js";

export class CardPlans extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.plans_ = new Plans();
    this.strategies_ = new Strategies();
    this.observers_ = new com.computablefacts.observers.Subject();
  }

  get plans() {
    return this.plans_;
  }

  set strategies(strategies) {
    this.strategies_ = strategies;
    this.render();
  }

  addOrUpdatePlan(name, strategy, beginYyyyMmDd, endYyyyMmDd) {
    this.plans_.addOrUpdate(name, strategy, beginYyyyMmDd, endYyyyMmDd);
    this.render();
  }

  onPlansUpdate(callback) {
    this.observers_.register('plans-update', () => {
      if (callback) {
        callback(this.plans_);
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
              <h3 class="card-title"><b>Plans</b></h3>
            </div>
            <div class="col-auto">
              <a class="btn btn-icon bp4-align-right" href="#" data-bs-toggle="modal" data-bs-target="#modal-add-plan">
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
      <div id="modal-add-plan" class="modal modal-blur fade" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Plan</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">The plan's name :</label>
                <input type="text" class="form-control" data-form-type="other">
              </div>
              <div class="mb-3">
                <div class="form-label">Select a single strategy :</div>
                <select type="text" class="form-select" value="">
                  <!-- FILLED DYNAMICALLY -->
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Begin date :</label>
                <div class="input-icon mb-2">
                  <input id="modal-add-plan-begin-date" class="form-control " placeholder="Select a date" value="">
                  <span class="input-icon-addon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
                      <path d="M16 3v4"></path>
                      <path d="M8 3v4"></path>
                      <path d="M4 11h16"></path>
                      <path d="M11 15h1"></path>
                      <path d="M12 15v3"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">End date :</label>
                <div class="input-icon mb-2">
                  <input id="modal-add-plan-end-date" class="form-control" placeholder="Select a date" value="">
                  <span class="input-icon-addon">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
                      <path d="M16 3v4"></path>
                      <path d="M8 3v4"></path>
                      <path d="M4 11h16"></path>
                      <path d="M11 15h1"></path>
                      <path d="M12 15v3"></path>
                    </svg>
                  </span>
                </div>
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
    elTable.columns = [{name: '#', attribute: 'id'}, {name: 'Name', attribute: 'name'}, {
      name: 'Strategy', attribute: 'strategy', render: row => `<span class="badge bg-blue-lt">${row.strategy}</span>`
    }, {
      name: 'Begin Date', attribute: 'begin', render: row => {
        return !row.begin ? '-' : row.begin;
      }
    }, {
      name: 'End Date', attribute: 'end', render: row => {
        return !row.end ? '-' : row.end;
      }
    }];
    elTable.rows = this.plans_.all();

    // Init Modal
    const elSelectStrategy = elCard.querySelector('#modal-add-plan .modal-body select');
    this.strategies_.all().forEach(strategy => {

      const elOption = document.createElement('option');
      elOption.value = strategy.name;
      elOption.innerText = strategy.name;

      elSelectStrategy.appendChild(elOption);
    });

    const beginDatePicker = new easepick.create({
      element: elCard.querySelector('#modal-add-plan-begin-date'),
      zIndex: 999999,
      css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
      date: new Date()
    });
    beginDatePicker.PluginManager.addInstance('AmpPlugin').options.resetButton = true;
    beginDatePicker.PluginManager.getInstance('AmpPlugin').options.darkMode = false;

    const endDatePicker = new easepick.create({
      element: elCard.querySelector('#modal-add-plan-end-date'),
      zIndex: 999999,
      css: ['https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css'],
      date: null
    });
    endDatePicker.PluginManager.addInstance('AmpPlugin').options.resetButton = true;
    endDatePicker.PluginManager.getInstance('AmpPlugin').options.darkMode = false;

    // Create plan
    const elBtnCreatePlan = elCard.querySelector('#modal-add-plan .modal-footer .btn-primary');
    elBtnCreatePlan.onclick = (e) => {

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

      const getDate = (picker) => {
        if (!picker.getDate()) {
          return null;
        }
        const offset = picker.getDate().getTimezoneOffset();
        const newDate = new Date(picker.getDate().getTime() - (offset * 60 * 1000));
        return newDate.toISOString().split('T')[0];
      };

      const elInputPlanName = elCard.querySelector('#modal-add-plan .modal-body input');
      this.addOrUpdatePlan(elInputPlanName.value, getSelection(elSelectStrategy)[0], getDate(beginDatePicker),
          getDate(endDatePicker));
      this.observers_.notify('plans-update');
    };
    return elCard;
  }
}