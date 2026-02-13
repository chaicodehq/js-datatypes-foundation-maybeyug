/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  // Your code here
  if (
    typeof thali !== "object" ||
    thali === null ||
    thali.name === undefined ||
    thali.items === undefined ||
    thali.price === undefined ||
    thali.isVeg === undefined
  ) {
    return "";
  }

  return `${thali.name.toUpperCase()} (${thali.isVeg ? "Veg" : "Non-Veg"}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`;
}

export function getThaliStats(thalis) {
  // Your code here
  if (Array.isArray(thalis) === false || thalis.length == 0) return null;

  const vegThaliCount = thalis.filter((element) => element.isVeg === true);

  const nonVegThaliCount = thalis.filter((element) => element.isVeg === false);

  const thaliPrice = thalis.reduce((accu, cValue) => accu + cValue.price, 0);

  const avgThaliPrice = thaliPrice / thalis.length;

  const priceList = thalis.map((e) => e.price);

  const costliestThali = Math.max(...priceList);
  const cheapestThali = Math.min(...priceList);

  const thaliNames = thalis.map((ele) => ele.name);

  return {
    totalThalis: thalis.length,
    vegCount: vegThaliCount.length,
    nonVegCount: nonVegThaliCount.length,
    avgPrice: avgThaliPrice.toFixed(2),
    cheapest: cheapestThali,
    costliest: costliestThali,
    names: thaliNames,
  };
}

export function searchThaliMenu(thalis, query) {
  // Your code here
  if (Array.isArray(thalis) === false || typeof query !== "string") return [];

  // const searchInItems = thalis.filter((element) =>
  //   element.items
  //     .map((element) => element.toUpperCase())
  //     .includes(query.toUpperCase()),
  // );

  const searchInItems = thalis.filter((element) =>
    element.items
      .map((element) => element.split(" "))
      .flat(1)
      .map((element) => element.toUpperCase())
      .includes(query.toUpperCase()),
  );

  const searchInName = thalis.filter((element) =>
    element.name
      .split(" ")
      .map((element) => element.toUpperCase())
      .includes(query.toUpperCase()),
  );

  if (searchInName.length > 0) {
    return searchInName;
  }
  return searchInItems;
}

export function generateThaliReceipt(customerName, thalis) {
  // Your code here

  if (
    typeof customerName !== "string" ||
    Array.isArray(thalis) === false ||
    thalis.length === 0
  ) {
    return "";
  }

  const thaliItems = thalis.map(
    (element) => `- ${element.name} x Rs.${element.price}`,
  );

  const lineItems = thaliItems.join("\n");

  const totalBill = thalis.reduce((accu, cValue) => accu + cValue.price, 0);

  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineItems}\n---\nTotal: Rs.${totalBill}\nItems: ${thaliItems.length}`;
}
