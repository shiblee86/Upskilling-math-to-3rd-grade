// ============================================================
//  MINIMAL DOM/BROWSER STUB
//  Lets the app's plain <script>-tag files (js/lib.js, js/curriculum.js,
//  script.js) load and run under `gjs` (a standalone SpiderMonkey engine)
//  for automated testing, since this project has no build step, no
//  npm/node, and no browser available in a CI-style environment.
//  Concatenated ahead of the app files by run.sh - see that file for
//  load order.
// ============================================================

globalThis.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = v; }
};

function fakeEl(id) {
  return {
    id,
    className: '',
    innerHTML: '',
    textContent: '',
    style: {},
    dataset: {},
    disabled: false,
    value: '',
    children: [],
    classList: {
      add() {}, remove() {}, toggle() {}, contains() { return false; }
    },
    addEventListener() {},
    appendChild(child) { this.children.push(child); },
    querySelector() { return fakeEl('nested'); },
    querySelectorAll() { return []; },
    scrollIntoView() {},
    focus() {}
  };
}

globalThis.document = {
  _elements: {},
  getElementById(id) {
    if (!this._elements[id]) this._elements[id] = fakeEl(id);
    return this._elements[id];
  },
  querySelectorAll(sel) { return []; },
  querySelector(sel) { return fakeEl('q'); },
  createElement(tag) { return fakeEl('created-' + tag); },
  addEventListener(evt, cb) { if (evt === 'DOMContentLoaded') this._domReadyCb = cb; }
};

globalThis.window.scrollTo = function () {};
globalThis.console = { log: print, error: print, warn: print };
globalThis.confirm = () => true;
globalThis.alert = (m) => print('ALERT: ' + m);
globalThis.Blob = function (parts, opts) { this.parts = parts; this.opts = opts; };
globalThis.URL = { createObjectURL() { return 'blob://fake'; } };
globalThis.FileReader = function () { this.onload = null; this.readAsText = () => {}; };
globalThis.setTimeout = (fn) => fn();
globalThis.setInterval = (fn) => { globalThis.__lastIntervalFn = fn; return 1; };
globalThis.clearInterval = (id) => {};

// Small file-reading helper for the static id/text cross-checks in run.js.
globalThis.readFile = function (path) {
  const GLib = imports.gi.GLib;
  const [ok, bytes] = GLib.file_get_contents(path);
  if (!ok) throw new Error('could not read ' + path);
  try { return imports.byteArray.toString(bytes); } catch (e) { return bytes.toString(); }
};
