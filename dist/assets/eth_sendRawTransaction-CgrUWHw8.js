async function eth_sendRawTransaction(request, signedTransaction) {
  return await request({
    method: "eth_sendRawTransaction",
    params: [signedTransaction]
  });
}
export {
  eth_sendRawTransaction as e
};
