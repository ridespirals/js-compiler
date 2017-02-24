const chai = require('chai')
const expect = chai.expect

describe('parser', () => {

    it('should exist', () => {
        let parser = require('./parser')
        expect(parser).to.be.defined
    })

})