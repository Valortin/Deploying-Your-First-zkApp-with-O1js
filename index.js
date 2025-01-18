const { Mina, PrivateKey, PublicKey } = require('o1js');
const MyZkApp = require('./zkapp');

(async () => {
  // Initialize the Mina blockchain
  Mina.setActiveInstance(Mina.LocalBlockchain());

  // Generate keys for deployment
  const deployerKey = PrivateKey.random();
  const zkAppKey = PrivateKey.random();
  const zkAppAddress = PublicKey.fromPrivateKey(zkAppKey);

  // Deploy the zkApp
  const zkApp = new MyZkApp(zkAppAddress);
  const txn = await Mina.transaction(deployerKey, () => {
    zkApp.deploy({ zkAppKey });
  });

  await txn.send();

  console.log('zkApp deployed at:', zkAppAddress.toBase58());

  // Test the zkApp logic
  const testTxn = await Mina.transaction(deployerKey, () => {
    zkApp.updateState(Field(42));
  });

  await testTxn.send();

  console.log('State updated to:', zkApp.state.get().toString());
})();
