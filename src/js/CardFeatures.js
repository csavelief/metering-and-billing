'use strict'

import {Features} from "./datastore.js";

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
        <table class="table table-vcenter">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            <!-- FILLED DYNAMICALLY -->
          </tbody>
        </table>   
      </div>
    `;

    const elList = elCard.querySelector('tbody');
    this.features_.all().forEach(feature => {
      const elRow = document.createElement('tr');
      elRow.innerHTML = `
        <td>${feature.id}</td>
        <td>${feature.name}</td>
      `;
      elList.appendChild(elRow);
    });
    return elCard;
  }
}