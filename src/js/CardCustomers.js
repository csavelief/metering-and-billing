'use strict'

import {Customers} from "./datastore.js";
import {Table} from "./Table.js";

export class CardCustomers extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.customers_ = new Customers();
    this.observers_ = new com.computablefacts.observers.Subject();
  }

  get customers() {
    return this.customers_;
  }

  addCustomer(email) {
    this.customers_.add(email);
    this.render();
  }

  onCustomersUpdate(callback) {
    this.observers_.register('customers-update', () => {
      if (callback) {
        callback(this.customers_);
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
              <h3 class="card-title"><b>Customers</b></h3>
            </div>
            <div class="col-auto">
              <a class="btn btn-icon bp4-align-right" href="#" data-bs-toggle="modal" data-bs-target="#modal-add-customer">
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
      <div id="modal-add-customer" class="modal modal-blur fade" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Customer</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">The customer's name :</label>
                <input type="text" class="form-control" data-form-type="other">
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

    const elTable = new Table(elCard.querySelector('.card-table'));
    elTable.columns = [{name: '#', attribute: 'id'}, {name: 'Name', attribute: 'name'}];
    elTable.rows = this.customers_.all();

    const elBtnCreateCustomer = elCard.querySelector('#modal-add-customer .modal-footer .btn-primary');
    elBtnCreateCustomer.onclick = (e) => {
      const elInputCustomerName = elCard.querySelector('#modal-add-customer .modal-body input');
      this.customers_.add(elInputCustomerName.value);
      elTable.rows = this.customers_.all();
      this.observers_.notify('customers-update');
    };
    return elCard;
  }
}