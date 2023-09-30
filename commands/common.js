function random(number) {
  const range = number.split("~");
  console.log(range[0], range[1]);
  return Math.floor(Number(range[0]) + Math.random() * Number(range[1]));
}

module.exports = { random };
