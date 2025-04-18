function combineArrays(
  colors: string[],
  clothing: string[],
  conditions: string[]
): string[] {
  return Array.from(
    { length: Math.max(colors.length, clothing.length, conditions.length) },
    (_, i) => {
      // Get elements with circular indexing (wraps around if one array is shorter)
      const color = colors[i % colors.length];
      const item = clothing[i % clothing.length];
      const condition = conditions[i % conditions.length];

      // Format each part
      const formattedItem =
        item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
      const formattedColor =
        color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
      let formattedCondition = condition.toLowerCase();
      if (condition.toLowerCase() === "diskon") {
        formattedCondition = "Diskon"; // Capitalize only if it's "Diskon"
      } else {
        formattedCondition = "sale"; // Ensure lowercase for "sale"
      }

      return `${formattedItem} ${formattedColor} ${formattedCondition}`;
    }
  );
}

// Test with original arrays
const colors: string[] = ["merah", "kuning", "hijau", "pink", "ungu"];
const clothing: string[] = ["baju", "celana", "topi", "jaket", "sepatu"];
const conditions: string[] = ["Diskon", "Sale", "Diskon", "Sale", "Sale"];

console.log("Original combination:");
console.log(combineArrays(colors, clothing, conditions));

// Test with added color
const extendedColors: string[] = [...colors, "maroon"];
console.log("\nWith extended colors:");
console.log(combineArrays(extendedColors, clothing, conditions));
