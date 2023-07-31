'use strict'

import {Features} from "./datastore.js";
import {Table} from "./Table.js";

export class CardFeatures extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.features_ = new Features();
  }

  addOrUpdateFeature(name) {
    this.features_.addOrUpdate(name);
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
        <h3 class="card-title">Features</h3>
      </div>
      <div class="card-table table-responsive">
        <!-- FILLED DYNAMICALLY -->
      </div>
    `;

    const elCardTable = elCard.querySelector('.card-table');
    const table = new Table(elCardTable);
    table.columns = [{name: '#', attribute: 'id'}, {name: 'Name', attribute: 'name'}];
    table.rows = this.features_.all();

    return elCard;
  }
}