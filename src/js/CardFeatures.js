'use strict'

import {Features} from "./datastore.js";
import {Table} from "./Table.js";

export class CardFeatures extends com.computablefacts.widgets.Widget {

  constructor(container) {
    super(container);
    this.features_ = new Features();
    this.observers_ = new com.computablefacts.observers.Subject();
  }

  get features() {
    return this.features_;
  }

  addOrUpdateFeature(name) {
    this.features_.addOrUpdate(name);
    this.render();
  }

  onFeaturesUpdate(callback) {
    this.observers_.register('features-update', () => {
      if (callback) {
        callback(this.features_);
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
                <label class="form-label">The feature's name :</label>
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
    elTable.rows = this.features_.all();

    const elBtnCreateFeature = elCard.querySelector('#modal-add-feature .modal-footer .btn-primary');
    elBtnCreateFeature.onclick = (e) => {
      const elInputFeatureName = elCard.querySelector('#modal-add-feature .modal-body input');
      this.addOrUpdateFeature(elInputFeatureName.value);
      this.observers_.notify('features-update');
    };
    return elCard;
  }
}