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
        <div class="container p-0">
          <div class="row align-items-center">
            <div class="col">
              <h3 class="card-title"><b>Features</b></h3>
            </div>
            <div class="col-auto">
              <a class="btn btn-icon bp4-align-right" href="#" data-bs-toggle="modal" data-bs-target="#modal-add-feature">
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
      <div id="modal-add-feature" class="modal modal-blur fade" style="display: none;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">New Feature</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" placeholder="The feature's name" data-form-type="other">
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

    const elCardTable = elCard.querySelector('.card-table');
    const table = new Table(elCardTable);
    table.columns = [{name: '#', attribute: 'id'}, {name: 'Name', attribute: 'name'}];
    table.rows = this.features_.all();

    const btnCreateFeature = elCard.querySelector('#modal-add-feature .modal-footer .btn-primary');
    btnCreateFeature.onclick = (e) => {
      const inputFeature = elCard.querySelector('#modal-add-feature .modal-body input');
      this.features_.addOrUpdate(inputFeature.value);
      table.rows = this.features_.all();
    };
    return elCard;
  }
}