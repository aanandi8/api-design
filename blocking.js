// blocking - won't go to next line until first line is done
// can become a problem in context of routes -> want to handle multiple requests
// but one request is taking a lot of time
// CPU-intensive things should not be done synchronously

const fs = require("fs/promises");
const path = require("path");
const read = async () => {
  const result = fs.readFile(path.join(__dirname, "package.json"), "utf-8");
  return result;
};
read().then((f) => console.log(f));
console.log("hi");
// With this result -> the hi prints out first while the read fn (more CPU-intensive task)
// is being processed and printed
