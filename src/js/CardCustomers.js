'use strict'

import {Customers} from "./datastore.js";

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
        <table class="table table-vcenter">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <!-- FILLED DYNAMICALLY -->
          </tbody>
        </table>   
      </div>
    `;

    const elList = elCard.querySelector('tbody');
    this.customers_.all().forEach(customer => {
      const elRow = document.createElement('tr');
      elRow.innerHTML = `
        <td>${customer.id}</td>
        <td>${customer.email}</td>
      `;
      elList.appendChild(elRow);
    });
    
    return elCard;
  }
}