const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString Validation', () => {

    it('should reject non-string values', () => {
        var login = 1234;
        var result = isRealString(login); 

        expect(result).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var login = "       "
        var result = isRealString(login);

        expect(result).toBe(false);
    });

    it('should allow  string with non-space characters', () => {
        var login = 'thisshouldpass';
        var result = isRealString(login); 

        expect(result).toBe(true);
    })

})
