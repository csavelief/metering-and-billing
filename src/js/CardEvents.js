'use strict'

import {Events} from "./datastore.js";
import {Table} from "./Table.js";

export class CardEvents extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.events_ = new Events();
  }

  get events() {
    return this.events_;
  }

  addEvent(timestamp, customerName, featureName, amount) {
    this.events_.add(timestamp, customerName, featureName, amount);
    this.render();
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
              <h3 class="card-title"><b>Events</b></h3>
            </div>
          </div>
        </div>
      </div>
      <div class="card-table table-responsive">
        <!-- FILLED DYNAMICALLY -->
      </div>
    `;

    const elTable = new Table(elCard.querySelector('.card-table'));
    elTable.columns = [{name: '#', attribute: 'id'},
      {name: 'Timestamp', attribute: 'timestamp', render: row => row.timestamp.toUTCString()},
      {name: 'Customer', attribute: 'customer', render: row => `<span class="badge bg-blue-lt">${row.customer}</span>`},
      {name: 'Feature', attribute: 'feature', render: row => `<span class="badge bg-blue-lt">${row.feature}</span>`},
      {name: 'Amount', attribute: 'amount'}];
    elTable.rows = this.events_.all();

    return elCard;
  }
}