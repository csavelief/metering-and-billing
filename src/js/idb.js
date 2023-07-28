(function (window) {

  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  'use strict'

  const datasets = [];

  com.computablefacts.idb = {};
  com.computablefacts.idb.getOrAddDataset = dataset => {

    const ds = datasets.filter(d => d.objectStoreName === dataset);

    if (ds.length >= 1) {
      return ds[0];
    }

    const db = {

      version: 1, // Important: only use whole numbers!

      objectStoreName: dataset,

      instance: {},

      upgrade: (e) => {

        const _db = e.target.result;
        const names = _db.objectStoreNames;
        const name = db.objectStoreName;

        if (!names.contains(name)) {
          _db.createObjectStore(name, {
            keyPath: 'id', autoIncrement: true
          });
        }
      },

      errorHandler: (error) => {
        window.alert('error: ' + error.target.code);
        debugger;
      },

      open: (callback) => {

        const request = window.indexedDB.open(db.objectStoreName, db.version);

        request.onerror = db.errorHandler;
        request.onupgradeneeded = db.upgrade;
        request.onsuccess = function (e) {
          db.instance = request.result;
          db.instance.onerror = db.errorHandler;
          callback();
        };
      },

      getObjectStore: (mode) => {

        mode = mode || 'readonly';

        const txn = db.instance.transaction([db.objectStoreName], mode);
        return txn.objectStore(db.objectStoreName);
      },

      clear: (onSuccess, onError) => {
        db.open(() => {

          const mode = 'readwrite';
          const store = db.getObjectStore(mode);
          const request = store.clear();

          request.onsuccess = onSuccess;
          request.onerror = onError;
        });
      },

      count: (onSuccess, onError) => {
        db.open(() => {

          const store = db.getObjectStore();
          const request = store.count();

          request.onsuccess = e => {
            onSuccess(e.target.result);
          };
          request.onerror = onError;
        });
      },

      save: (data, onSuccess, onError) => {
        db.open(() => {

          const mode = 'readwrite';
          const store = db.getObjectStore(mode);
          const request = data.id ? store.put(data) : store.add(data);

          request.onsuccess = onSuccess;
          request.onerror = onError;
        });
      },

      get: (id, onSuccess, onError) => {

        id = parseInt(id, 10);

        db.open(() => {

          const store = db.getObjectStore();
          const request = store.get(id);

          request.onsuccess = e => {
            onSuccess(e.target.result);
          };
          request.onerror = onError;
        });
      },

      getAll: (onSuccess, onError) => {
        db.open(() => {

          const store = db.getObjectStore();
          const cursor = store.openCursor();
          const data = [];

          cursor.onsuccess = e => {

            const result = e.target.result;

            if (result) {
              data.push(result.value);
              result.continue();
            } else {
              onSuccess(data);
            }
          };
          cursor.onerror = onError;
        });
      },

      'delete': (id, onSuccess, onError) => {

        id = parseInt(id, 10);

        db.open(() => {

          const mode = 'readwrite';
          const store = db.getObjectStore(mode);
          const request = store.delete(id);

          request.onsuccess = onSuccess;
          request.onerror = onError;
        });
      },

      deleteAll: (onSuccess, onError) => {
        db.open(() => {

          const mode = 'readwrite';
          const store = db.getObjectStore(mode);
          const request = store.clear();

          request.onsuccess = onSuccess;
          request.onerror = onError;
        });
      }
    };

    datasets.push(db);
    return db;
  };

}(window));