const expect = require('expect');
const {isRealString} = require('./validation');

describe('# isRealString', () => {
	it('should reject non-string values', () => {
		var res = isRealString(988);
		expect(res).toBe(false);
	});

	it('should reject strings with spaces only', () => {
		var res = isRealString('   ');
		expect(res).toBe(false);
	});

	it('should allow strings with non-space characters', () => {
		var res = isRealString('  Rs09  Knight  ');
		expect(res).toBe(true);
	});
});
