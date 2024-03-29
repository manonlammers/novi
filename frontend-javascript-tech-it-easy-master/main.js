// VOORRAAD ARRAY MET TV'S
const inventory = [
  {
    type: '43PUS6504/12',
    name: '4K TV',
    brand: 'Philips',
    price: 379,
    availableSizes: [43, 50, 58, 65],
    refreshRate: 50,
    screenType: 'LED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: false,
      hdr: true,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 23,
    sold: 2,
  },
  {
    type: 'NH3216SMART',
    name: 'HD smart TV',
    brand: 'Nikkei',
    price: 159,
    availableSizes: [32],
    refreshRate: 100,
    screenType: 'LED',
    screenQuality: 'HD ready',
    smartTv: true,
    options: {
      wifi: true,
      speech: false,
      hdr: false,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 4,
    sold: 4,
  },
  {
    type: 'QE55Q60T',
    name: '4K QLED TV',
    brand: 'Samsung',
    price: 709,
    availableSizes: [43, 50, 55, 58, 65],
    refreshRate: 60,
    screenType: 'QLED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: true,
      hdr: true,
      bluetooth: true,
      ambiLight: false,
    },
    originalStock: 7,
    sold: 0,
  },
  {
    type: '43HAK6152',
    name: 'Ultra HD SMART TV',
    brand: 'Hitachi',
    price: 349.5,
    availableSizes: [43, 50, 55, 58],
    refreshRate: 60,
    screenType: 'LCD',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: true,
      hdr: true,
      bluetooth: true,
      ambiLight: false,
    },
    originalStock: 5,
    sold: 5,
  },
  {
    type: '50PUS7304/12',
    name: 'The One 4K TV',
    brand: 'Philips',
    price: 479,
    availableSizes: [43, 50, 55, 58, 65, 70],
    refreshRate: 50,
    screenType: 'LED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: true,
      hdr: true,
      bluetooth: true,
      ambiLight: true,
    },
    originalStock: 8,
    sold: 3,
  },
  {
    type: '55PUS7805',
    name: '4K LED TV',
    brand: 'Philips',
    price: 689,
    availableSizes: [55],
    refreshRate: 100,
    screenType: 'LED',
    screenQuality: 'Ultra HD/4K',
    smartTv: true,
    options: {
      wifi: true,
      speech: false,
      hdr: true,
      bluetooth: false,
      ambiLight: true,
    },
    originalStock: 6,
    sold: 3,
  },
  {
    type: 'B2450HD',
    name: 'LED TV',
    brand: 'Brandt',
    price: 109,
    availableSizes: [24],
    refreshRate: 60,
    screenType: 'LED',
    screenQuality: 'Full HD',
    smartTv: false,
    options: {
      wifi: false,
      speech: false,
      hdr: false,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 10,
    sold: 8,
  },
  {
    type: '32WL1A63DG',
    name: 'HD TV',
    brand: 'Toshiba',
    price: 161,
    availableSizes: [32],
    refreshRate: 50,
    screenType: 'LED',
    screenQuality: 'Full HD',
    smartTv: false,
    options: {
      wifi: false,
      speech: false,
      hdr: true,
      bluetooth: false,
      ambiLight: false,
    },
    originalStock: 10,
    sold: 8,
  },
];

// const tvNames2 = [];
// for (let i = 0; i < inventory.length; i ++) {
//   const item = inventory[i];
//   tvNames2.push(item.type);
// }

//opdracht 1a:
const tvNames = inventory.map((item) => {
  return item.type;
});

console.log('tvNames: ', tvNames);

//opdracht 1b:
const soldTv = inventory.filter((item) => {
  return item.originalStock === item.sold;
});

console.log('soldTv: ', soldTv);

//opdracht 1c:
const ambiLight = inventory.filter((item) => {
  return item.options.ambiLight;
});

console.log('ambiLight: ', ambiLight);

//opdracht 1d:
const tvPriceLowToHigh = [...inventory].sort((a,b) => {
  return a.price - b.price;
});

console.log('tv sorted by price:', tvPriceLowToHigh);

//opdracht 2a:
let soldTvCount = 0;
for(let i = 0; i < inventory.length; i++) {
  const item = inventory[i]
  soldTvCount = soldTvCount + item.sold;
}

console.log("sold tv", soldTvCount);

// //opdracht 2b:
const soldTvsSpan = document.getElementById('sold-tvs-span');
soldTvsSpan.innerHTML = soldTvCount;
soldTvsSpan.style.color = '#008000';

//opdracht 2c:
let countTv = 0;
for (let i = 0; i < inventory.length; i++) {
  const item = inventory[i]
  countTv = countTv + item.originalStock;
}
console.log('ingekochte tv:', countTv);

//opdracht 2d:
const purchasedTvSpan = document.getElementById('purchased-tv-span');
purchasedTvSpan.innerHTML = countTv;
purchasedTvSpan.style.color = '#0000FF';

//opdracht 2e:
let availableTvs = 0;
for (let i = 0; i < inventory.length; i++) {
  const item = inventory[i]
  availableTvs = availableTvs + item.originalStock - item.sold;
}

console.log(availableTvs);

const availableTvsSpan = document.getElementById('available-tvs-span')
availableTvsSpan.innerHTML = availableTvs;
availableTvsSpan.style.color = '#FF0000';

//opdracht 3a:
const tvList = document.getElementById('tv-list-3a');
const listItem = inventory.map((item) => {
  return `<li>${item.brand}</li>`
})
tvList.innerHTML = `${listItem.join('')}`

//opdracht 3b:
function renderTvBrands (tvs, targetElement) {
  const listItems = tvs.map((item) => {
    return `<li>${item.brand}</li>`
  });
  targetElement.innerHTML = listItems.join('')
}

renderTvBrands(inventory, document.getElementById('tv-list-3b'));

//opdracht 4a:
function tvNameToString(tv) {
  return `${tv.brand} ${tv.type} - ${tv.name}`;
}

//opdracht 4b:
function tvPriceToString(tv) {
  return `€${tv.price},-`
}

//opdracht 4c:
function tvSizesToString(tv) {
  return tv.availableSizes.map(size => {
    return `${size} inch (${(Number(size * 2.34).toFixed(0))}cm)`
  }).join(' | ');
}

//opdracht 4e:
function renderTvs(tv) {
  const tvsDiv = document.getElementById('tvs-div-4d');
  tvsDiv.innerHTML = inventory.map((item) => {
    const name = tvNameToString(item);
    const price = tvPriceToString(item);
    const sizes = tvSizesToString(item);

    return `<p>${name}<br/>${price}<br/>${sizes}</p>`
  });
}



