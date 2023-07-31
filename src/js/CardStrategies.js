'use strict'

import {Features, Strategies} from "./datastore.js";
import {Table} from "./Table.js";

export class CardStrategies extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.strategies_ = new Strategies();
    this.features_ = new Features();
    this.observers_ = new com.computablefacts.observers.Subject();
  }

  set features(features) {
    this.features_ = features;
    this.render();
  }

  addOrUpdateStrategy(name, features, fnStrategy) {
    this.strategies_.addOrUpdate(name, features, fnStrategy);
    this.render();
  }

  onStrategiesUpdate(callback) {
    this.observers_.register('strategies-update', () => {
      if (callback) {
        callback(this.strategies_);
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
              <h3 class="card-title"><b>Strategies</b></h3>
            </div>
            <div class="col-auto">
              <a class="btn btn-icon bp4-align-right" href="#" data-bs-toggle="modal" data-bs-target="#modal-add-strategy">
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
      <div id="modal-add-strategy" class="modal modal-blur fade" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Strategy</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">The strategy's name :</label>
                <input type="text" class="form-control" data-form-type="other">
              </div>
              <div class="mb-3">
                <div class="form-label">Select one or more features :</div>
                <select type="text" class="form-select" id="select-features" value="" multiple="multiple">
                  <!-- FILLED DYNAMICALLY -->
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Algorithm</label>
                <textarea class="form-control" data-bs-toggle="autosize" style="height: 280px;">
function strategy(events) {

  /* TODO : process events and return price */
  return 0;
}
                </textarea>
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
      name: 'Features', attribute: 'features', render: row => {
        return row.features.map(feature => {
          return `<span class="badge bg-blue-lt">${feature}</span>`;
        }).join(' ')
      }
    }, {
      name: 'Strategy', attribute: 'strategy', render: row => {
        return row.strategy.toString()
      }
    }];
    elTable.rows = this.strategies_.all();

    // Init Modal
    const elSelectFeatures = elCard.querySelector('#modal-add-strategy .modal-body select');
    this.features_.all().forEach(feature => {

      const elOption = document.createElement('option');
      elOption.value = feature.name;
      elOption.innerText = feature.name;

      elSelectFeatures.appendChild(elOption);
    });

    // Create strategy
    const elBtnCreateStrategy = elCard.querySelector('#modal-add-strategy .modal-footer .btn-primary');
    elBtnCreateStrategy.onclick = (e) => {

      const getSelectValues = (select) => {

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

      const elInputStrategyName = elCard.querySelector('#modal-add-strategy .modal-body input');
      const elStrategyImplementation = elCard.querySelector('#modal-add-strategy .modal-body textarea');
      this.strategies_.addOrUpdate(elInputStrategyName.value, getSelectValues(elSelectFeatures),
          new Function('return ' + elStrategyImplementation.value)());
      elTable.rows = this.strategies_.all();
      this.observers_.notify('strategies-update');
    };
    return elCard;
  }
}