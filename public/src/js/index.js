import '../scss/main.scss';

class Menu {
	constructor() {
		this.test = 'test';
	}

	run() {
		console.log(this.test);
	}
}

let test = new Menu();

test.run();