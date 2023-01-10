import { endAdventure } from '..';
import { playCroquet } from './4_croquet';
import { askQuestion, clear, print } from '../console';
import { setMaxListeners } from 'events';
import { setFlagsFromString } from 'v8';
import { type } from 'os';

// using const assertions to create a type
const drinks = ['Coffee', 'Tea', 'Water', 'Lemonade'] as const;
type DrinkType = typeof drinks[number];

type Drink = {
	type: DrinkType;
	poured: boolean;
};

type Seat = {
	drink: Drink;
};

type Table = {
	seats: Array<Seat>;
};

function setTheTable(): Table {
	// 👉 FIXME ❌
	const table: Table= {
		seats: []
	}

	//table.seats.map((drink)=> { type: drink, poured: true})
	//drinks.map((drink)=> drink)
	//table[0].seats.push({drink:{type:'Coffee',poured:true}})

	//drinks.forEach((item)=> table.seats.push({drink:{type:item,poured:true}}))
	drinks.forEach((item)=> table.seats.push({drink:{type:'Tea',poured:true}}))


	//return { seats: [] };
	return table;

}

export function attendATeaParty() {
	clear(true);
	print('The Mad Hatter 🎩 welcomes you to his tea party ☕ ');

	print(`He and the March Hare set the table...`);

	const drinks = setTheTable();

	//console.log('table', drinks, 'drinks.seats', drinks.seats, 'tamanho', drinks.seats.length)
	if (!drinks || !drinks.seats || drinks.seats.length <= 0) {
		print(`... but something went very wrong with the table. 😱`);
		return endAdventure();
	}

	print(`... they set ${drinks.seats.length} place(s) for their guests.`);

	if (drinks.seats.length < 3) {
		print(`😱 That's not enough seats! The party is cancelled...`);
		return endAdventure();
	}

	let properlySet = true;

	drinks.seats.forEach((seat) => {
		//console.log('seats', seat.drink.poured, ' tipo: ', seat.drink.type)
		if (!seat.drink.poured || seat.drink.type !== 'Tea') {
			//console.log('Dentro do if seats', seat.drink.poured, ' tipo: ', seat.drink.type)
			properlySet = false;
		}
	});

	if (!properlySet) {
		print(
			`😱 Uhoh! This isn't a proper tea party! Every seat must have a fully poured cup of tea.`
		);
		return endAdventure();
	}

	print(
		`🥳 Every seat had a lovely cup of tea, and a great time was had by all. 🥳 `
	);
	print(`🏑 Time for a nice game of croquet! 🏑`);
	return askQuestion('Press ENTER to continue! ', playCroquet);
}
