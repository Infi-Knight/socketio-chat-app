var generateMessage = (from, text) => {
  return {
    // ES6 syntax for referring from and text properties
    from, 
    text,
    createdAt: new Date().getTime()
  };
};

var generateLocationMessage = (from, latitude, longitude) => {
	return {
		from, 
		url: `https://www.google.com/maps?q=${latitude},${longitude}`,
		createdAt: new Date().getTime()
	}
};

module.exports = {generateMessage, generateLocationMessage};