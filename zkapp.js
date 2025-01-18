const { Field, PrivateKey, PublicKey, Proof, SmartContract } = require('o1js');

class MyZkApp extends SmartContract {
  // Define a state variable
  state = this.state(Field);

  // Constructor to initialize state
  constructor(address) {
    super(address);
    this.state.set(Field(0)); // Initialize state to zero
  }

  // Method to update the state securely
  updateState(newValue, signature) {
    const isValid = this.verifySignature(signature);
    if (!isValid) {
      throw new Error('Unauthorized update attempt');
    }
    this.state.set(newValue);
  }
  
}

module.exports = MyZkApp;
