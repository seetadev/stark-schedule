# StarkSchedule - Health Tracking on Starknet

**StarkSchedule** is a Starknet smart contract application built with Cairo that enables users to manage health profiles and track vital health metrics such as blood sugar readings, HbA1c levels, and weight.

---

## 📊 Project Overview

This application showcases how blockchain can be applied in healthcare to enable:

* 📋 Registration of personal health profiles
* 📈 Secure tracking of vital health metrics
* ♻️ Ongoing updates to user information
* 🔐 Ownership and control of personal health data

---

## 🛠️ Technical Stack

* **Cairo 1.0** – Smart contract language for Starknet
* **Starknet** – Layer 2 ZK-Rollup on Ethereum
* **Scarb** – Cairo package manager and build tool
* **Starknet Foundry** – Testing framework for Cairo
* **OpenZeppelin Contracts** – Access control and ownership primitives

---

## 📁 Project Structure

```
sn_stark_schedule/
├── src/
│   ├── contracts/         # Smart contract implementations
│   │   └── starkschedule.cairo
│   ├── models/            # Data models
│   │   └── mstarkschedule.cairo
│   ├── interfaces/        # Contract interfaces
│   │   └── istarkschedule.cairo
│   ├── error/             # Error definitions
│   │   └── errstarkschedule.cairo
│   └── lib.cairo          # Library exports
├── tests/                 # Contract tests
│   └── test_contract.cairo
├── target/                # Build artifacts
├── account.json           # Deployment account information
├── Scarb.toml             # Project configuration
└── .devcontainer.json     # Development container configuration
```

---

## 🔧 Contract Features

### 👤 User Management

* Register users with:

  * Name
  * Age
  * Gender
  * Height
  * Weight
* Track registration status
* Update personal health profiles

### 🧪 Health Metrics

* Record and fetch:

  * Blood sugar readings
  * HbA1c levels
  * Weight changes
* Support for different weight units

### 🔐 Access Control

* Owner-based control using `OwnableComponent` from OpenZeppelin
* Restricted functions accessible only by the contract owner

---

## ⚙️ Setup & Installation

### 🧱 Prerequisites

* [Docker](https://www.docker.com/)
* Visual Studio Code

  * [Remote - Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 🚀 Setup Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/starkschedule.git
   cd starkschedule
   ```
2. Open the folder in **VS Code** with **Remote Containers**
3. VS Code will automatically build and configure the dev environment

---

## 🔨 Development

### 🏠 Build the Contract

```bash
scarb build
```

### 🧪 Run Tests

```bash
scarb test
```

---

## 🚩 Deployment

The contract can be deployed to the Starknet **testnet** or **mainnet**.

### 📅 Deployment Process

1. **Build the contract** (if not already built):

   ```bash
   scarb build
   ```

2. **Declare the contract class** using Starkli:

   ```bash
   starkli declare ./target/dev/sn_stark_schedule::starkschedule --account account.json
   ```

3. **Deploy the contract** with an initial owner:

   ```bash
   starkli deploy <class_hash> --account account.json --inputs <owner_address>
   ```

4. **Verify deployment**:
   Use `starkli call` to ensure the contract is reachable and state is accessible.

### 📡 RPC Endpoints

Used for:

* Communicating with the Starknet network
* Submitting transactions
* Reading blockchain state
* Testing against forked networks

Uncomment and configure the fork section in `Scarb.toml` for RPC settings.

---

## 👥 Interacting with the Contract

After deployment, users can:

* Register personal health profiles
* Update health metrics like blood sugar and weight
* Retrieve their recorded health information

Example CLI tool: **Starkli**

---

## 🔧 Testing

The test suite verifies:

* User registration functionality
* Health metric update flows
* Access control enforcement
* Error handling scenarios

To run all tests:

```bash
scarb test
```

---

## 📄 License

This project is licensed under the **MIT License**.
