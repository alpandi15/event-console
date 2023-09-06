const number = {
	rand(min, max) {
		return Math.floor(Math.random() * max) + min - 1;
	},

	toNumber(int = 0) {
		return parseInt(int?.toString().replace(/[^0-9]/g, ''));
	},

	toInteger(int = 0) {
		return parseInt(int?.toString().replace('.', ''));
	},

	local(int) {
		if (typeof int === 'undefined') return 0;
		let output = ''
		if (int < 0) {
			output = '-' + number
				.toNumber(int)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
		} else {
			output = number
				.toNumber(int)
				.toString()
				.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
		}
		return output
	},

	currency(data = '', currency = 'IDR') {
		return (
			currency +
			' ' +
			new Intl.NumberFormat('id-ID')
				.format(data)
				.replace(/(\.|,)00$/g, '')
				.toString()
		);
	},

	short: (amount, currency = '') => {
		let amountStr = '';

		let newAmount = amount ? amount : parseFloat(amount);

		if (newAmount >= 1000000000) {
			newAmount = newAmount / 1000000000;
			amountStr = 'B';
		} else if (newAmount >= 1000000) {
			newAmount = newAmount / 1000000;
			amountStr = 'm';
		} else if (newAmount >= 1000) {
			newAmount = newAmount / 1000;
			amountStr = 'k';
		}

		return `${currency} ${newAmount.toFixed(2).replace(/(\.|,)00$/g, '')}${amountStr}`.trim();
	},
};

export default number;
