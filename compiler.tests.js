const chai = require('chai')
const expect = chai.expect

describe('compiler', () => {

    it('should exist', () => {
        let compiler = require('./compiler')
        expect(compiler).to.be.defined
    })

})