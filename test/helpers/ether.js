function ether(n) {
  var wei = web3.utils.toWei(n.toString(), "ether");
  return web3.utils.toBN(wei);
}

module.exports = {
  ether
};
