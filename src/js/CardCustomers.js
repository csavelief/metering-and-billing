'use strict'

import {Customers} from "./datastore.js";
import {Table} from "./Table.js";

export class CardCustomers extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.customers_ = new Customers();
  }

  addCustomer(email) {
    this.customers_.add(email);
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
        <h3 class="card-title">Customers</h3>
      </div>
      <div class="card-table table-responsive">
        <!-- FILLED DYNAMICALLY -->
      </div>
    `;

    const elCardTable = elCard.querySelector('.card-table');
    const table = new Table(elCardTable);
    table.columns = [{name: '#', attribute: 'id'}, {name: 'Email', attribute: 'email'}];
    table.rows = this.customers_.all();

    return elCard;
  }
}