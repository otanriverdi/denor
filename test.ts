console.log("Started");

setTimeout(() => {
  throw new Error("Errorrrrrr");
}, 10000);

// throw new Error("fuu");
