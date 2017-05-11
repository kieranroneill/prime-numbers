import Promise from 'bluebird';
import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { assert, mock, spy, stub } from 'sinon';

// Server.
import app from '../src/server/app';

// General globals.
global.assert = assert;
global.expect = expect;
global.mock = mock;
global.spy = spy;
global.stub = (...args) => stub.apply(this, args).usingPromise(Promise); // Use the bluebird library.

// Server globals.
global.app = app;

// Client globals.
global.document = new JSDOM('<!doctype html><html><body></body></html>');
