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
        #app-body {
          background-color: red;
          color: white;
        }
      </style>
      <div id="app-body">
        TODO
      </div>
    `;
  }
}