import Promise from 'bluebird';
import { expect } from 'chai';
import { assert, mock, spy, stub } from 'sinon';

// General globals.
global.assert = assert;
global.expect = expect;
global.mock = mock;
global.spy = spy;
global.stub = (...args) => stub.apply(this, args).usingPromise(Promise); // Use the bluebird library.
