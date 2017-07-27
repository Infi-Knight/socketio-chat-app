var moment = require('moment');

var generateMessage = (from, text) => {
  return {
    // ES6 syntax for referring from and text properties
    from, 
    text,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from, 
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: moment().valueOf()
	}
};

module.exports = {generateMessage, generateLocationMessage};
