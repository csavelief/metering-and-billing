'use strict'

export class App {

  constructor() {
  }

  /**
   * Display the app.
   *
   * @param {string} elementId the parent element id.
   */
  init(elementId) {

    const container = document.getElementById(elementId);
    container.innerHTML = `
      <style>
        /* TODO : ADD PAGE-SPECIFIC CSS HERE */
      </style>
      <div id="app-body" class="page">
        <div class="page-wrapper">
          <div class="page-body">
            <div class="container-xl">
              <div class="row row-deck row-cards">
                <div class="col-4">
                  <div class="card">
                    <div class="card-body" style="height: 10rem"></div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card">
                    <div class="card-body" style="height: 10rem"></div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="card">
                    <div class="card-body" style="height: 10rem"></div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="card">
                    <div class="card-body" style="height: 10rem"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}