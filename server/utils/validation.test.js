const expect = require('expect');
const { isRealString } = require('./validation.js');

describe('isRealString', () => {

    it('should reject non-string values', () => {
        let params = isRealString(98);
        expect(params).toBe(false);
    });

    it('should reject string with only spaces', () => {
        let params = isRealString('   ');
        expect(params).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        let params = isRealString('Mike');
        expect(params).toBe(true);
    });

});