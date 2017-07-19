var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

// this test is synchronous so no need to use done
describe('# generateMessage', () => {
  it ('should generate a correct message object', () => {
    var from = 'Ravi';
    var text = 'How you doin?';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    // ES6
    expect(message).toInclude({from,text});
  });
});

describe('# generateLocationMessage', () => {
	it ('should generate correct location object', () => {
		var from = 'Ravi';
		var latitude = 27;
		var longitude = 23;

		var message = generateLocationMessage(from, latitude, longitude);
		expect(message.from).toBe(from);
		expect(message.createdAt).toBeA('number');
		expect(message.url).toBe('https://www.google.com/maps?q=27,23');
	});
});