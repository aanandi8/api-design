setTimeout(() => {
  throw new Error("oops");
}, 300);
process.on("uncaughtException", () => {});
// Something that is asynchronous and broke -> not with express, just with node.
process.on("unhandledRejection", () => {});
