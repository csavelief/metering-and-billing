'use strict'

export class Table extends com.computablefacts.widgets.Widget {

  static PAGE_SIZE = 5;

  constructor(container) {
    super(container);
    this.rows_ = [];
    this.columns_ = [];
    this.pageNumber_ = 0;
  }

  set rows(rows) {
    this.rows_ = rows;
    this.render();
  }

  set columns(columns) {
    this.columns_ = columns;
    this.render();
  }

  /**
   * @override
   */
  _newElement() {

    const elTable = document.createElement('div');
    elTable.innerHTML = `
      <div class="card-table table-responsive">
        <table class="table table-vcenter">
          <thead>
            <tr>
              <!-- FILLED DYNAMICALLY -->
            </tr>
          </thead>
          <tbody>
            <!-- FILLED DYNAMICALLY -->
          </tbody>
        </table>
      </div>
      ${this._pagination()}
    `;

    const elHeader = elTable.querySelector('tr');
    const columns = this.columns_.map(column => `<th>${column.name}</th>`);
    elHeader.innerHTML = columns.join('\n');

    const elBody = elTable.querySelector('tbody');
    this._page().forEach(row => {

      const columns = [];
      this.columns_.forEach(column => {
        if (column.render) {
          columns.push(`<td>${column.render(row)}</td>`);
        } else {
          columns.push(`<td>${row[column.attribute]}</td>`);
        }
      });

      const elRow = document.createElement('tr');
      elRow.innerHTML = columns.join('\n');
      elBody.appendChild(elRow);
    });

    const elPagination = elTable.querySelector('.pagination');
    elPagination.onclick = (e) => {
      e = window.event ? event.srcElement : e.target;
      if (e.className && e.className.indexOf('page-link') !== -1) {
        const attr = e.getAttribute('data-attr');
        if (attr === 'prev') {
          this._prevPage();
        } else if (attr === 'next') {
          this._nextPage();
        } else {
          this._jump(parseInt(attr, 10));
        }
      }
    }
    return elTable;
  }

  _pagination() {

    const links = () => {

      const linkz = [];

      for (let i = 0; i < this._nbPages(); i++) {
        linkz.push(`
          <li class="page-item ${this.pageNumber_ === i ? 'active' : ''}">
            <a class="page-link" href="#" data-attr="${i}">${i + 1}</a>
          </li>
        `);
      }
      return linkz.join('\n');
    };
    return `
      <div class="card-footer d-flex align-items-center">
        <p class="m-0 text-muted">
          Showing <span>${(this.pageNumber_ * Table.PAGE_SIZE) + 1}</span>
          to <span>${(this.pageNumber_ * Table.PAGE_SIZE) + Math.min(this._page().length, Table.PAGE_SIZE)}</span>
          of <span>${this.rows_.length}</span>
          entries
        </p>
        <ul class="pagination m-0 ms-auto">
          <li class="page-item ${this.pageNumber_ === 0 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-attr="prev">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
              </svg>
            </a>
          </li>
          ${links()}
          <li class="page-item ${this.pageNumber_ === this._nbPages() - 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" data-attr="next">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </a>
          </li>
        </ul>
      </div>
    `;
  }

  _nbPages() {
    return this.rows_.reduce(this._toPartitionsOfSize(Table.PAGE_SIZE), []).length;
  }

  _prevPage() {
    this._jump(this.pageNumber_ > 0 ? this.pageNumber_ - 1 : this.pageNumber_);
  }

  _nextPage() {
    this._jump(this.pageNumber_ < this._nbPages() - 1 ? this.pageNumber_ + 1 : this.pageNumber_);
  }

  _jump(page) {
    this.pageNumber_ = page;
    this.render();
  }

  _page() {
    const pages = this.rows_.reduce(this._toPartitionsOfSize(Table.PAGE_SIZE), []);
    return pages.length <= 0 ? [] : pages[Math.min(pages.length - 1, this.pageNumber_)];
  }

  _toPartitionsOfSize(size) {

    let partition = [];

    return (acc, val) => {

      partition.push(val);

      if (partition.length === 1) {
        acc.push(partition);
      }
      if (partition.length === size) {
        partition = [];
      }
      return acc;
    };
  }
}