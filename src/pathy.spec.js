'use strict';

require('mocha');
const chai = require('chai');

const expect = chai.expect;

const pathy = require('./pathy');

describe('#pathy', () => {
  it('should be a function', () => expect(typeof pathy).to.equal('function'));

  it('should fail if nothing passed in', () => expect(pathy()).to.equal(undefined));

  it('should return defaultValue if first parameter not object', () => {
    const defaultValue = 'default';
    expect(pathy('string', 'second', defaultValue)).to.equal(defaultValue);
  });

  it('should return property if first parameter not object and third not defined', () => {
    const property = 'property';
    expect(pathy('string', property)).to.equal(property);
  });

  it('should return the key path of the property if on the first level', () => {
    const keyPath = 'level1';
    const property = 'property';
    const object = {
      [keyPath]: property
    };

    expect(pathy(object, property)).to.equal(keyPath);
  });

  it('should return the key path of the property if on the second level', () => {
    const keyPath1 = 'level1';
    const keyPath2 = 'level2';
    const property = 'property';
    const object = {
      [keyPath1]: {
        [keyPath2]: property
      }
    };

    expect(pathy(object, property)).to.equal(`${keyPath1}.${keyPath2}`);
  });

  it('should return the key path of deeply nested properties', () => {
    const keyPath1 = 'level1';
    const keyPath2 = 'level2';
    const keyPath3 = 'level3';
    const keyPath4 = 'level4';
    const keyPath5 = 'level5';
    const property = 'property';
    const object = {
      [keyPath1]: {
        [keyPath2]: {
          [keyPath3]: {
            [keyPath4]: {
              [keyPath5]: property
            },
          },
        }
      }
    };

    expect(pathy(object, property)).to.equal(`${keyPath1}.${keyPath2}.${keyPath3}.${keyPath4}.${keyPath5}`);
  });

  it('should return default value if not found', () => {
    const keyPath1 = 'level1';
    const keyPath2 = 'level2';
    const property = 'property';
    const defaultValue = 'default';
    const object = {
      [keyPath1]: {
        [keyPath2]: 'notProperty'
      }
    };

    expect(pathy(object, property, defaultValue)).to.equal(defaultValue);
  });

  it('should return original property if not found and no defaultValue', () => {
    const keyPath1 = 'level1';
    const keyPath2 = 'level2';
    const property = 'property';
    const object = {
      [keyPath1]: {
        [keyPath2]: 'notProperty'
      }
    };

    expect(pathy(object, property)).to.equal(property);
  });

  it('should return the first property match', () => {
    const keyPath1 = 'level1';
    const keyPath2 = 'level2';
    const correctPath = 'correct';
    const property = 'property';
    const object = {
      [correctPath]: property,
      [keyPath1]: {
        [keyPath2]: property
      }
    };

    expect(pathy(object, property)).to.equal(correctPath);
  });
});
