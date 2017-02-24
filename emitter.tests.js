const chai = require('chai')
const expect = chai.expect

describe('emitter', () => {

    it('should exist', () => {
        let emitter = require('./emitter')
        expect(emitter).to.be.defined
    })

})