export function formatPrice(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "INR"
  });
}

export function rando(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export function getCafeName() {
  
  const firstName = [
    "aroma",
    "trifecta",
    "fresh",
    "beany",
    "boston",
    "club",
    "coffee",
    "cuppy",
    "dream",
    "espresso",
    "grinders",
    "expresso",
    "ground",
    "sparkling",
    "impresso",
    "jackedUp",
    "jumpin",
    "jumpstart",
    "lavaJava",
    "manhattan",
    "mugs",
    "spicedChai",
    "jackson",
    "steamin",
    "steamy",
    "tatianas",
    "family",
    "vintage",
    "friendly",
    "roasted",
    "mojoJojo",
    "jamies",
    "marks",
    "newHub",
    "mikes",
    "yoLo"
  ];

  const middleName = [
    "beans",
    "bean",
    "cups",
    "mugs",
    "coffee",
    "cafe",
    "cappuccinos",
    "mochaccinos",
    "geese",
    "caldi",
    "aromatico",
    "crema",
    "salvaje",
    "twists",
    "latte",
    "baristas",
    "shop",
    "joint",
    "restaurant",
    "treats",
    "yums",
    "store",
    "house",
    "point",
    "hut",
    "breakfast",
    "cafeteria",
    "delights",
    "oven",
    "coffeeville"
  ];

  const lastName = [
    "washington",
    "georgia",
    "kentucky",
    "newYork",
    "kansas",
    "texas",
    "vermont",
    "virginia",
    "springfield",
    "florida",
    "michigan",
    "oregon",
    "tennessee",
    "wisconsin",
    "connecticut",
    "winchester",
    "nebraska",
    "franklin",
    "clinton",
    "maryland",
    "montana",
    "ohio",
    "greenville",
    "millford",
    "fairview",
    "madison",
    "georgetown",
    "arlington",
    "oxford",
    "lexington"
  ];

  return `${rando(firstName)}-${rando(middleName)}-${rando(lastName)}`;
}
