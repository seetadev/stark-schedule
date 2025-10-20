export const ABI = [
  {
    name: "CounterImpl",
    type: "impl",
    interface_name:
      "sn_stark_schedule::interfaces::istarkschedule::IStarkSchedule",
  },
  {
    name: "sn_stark_schedule::models::mstarkschedule::User",
    type: "struct",
    members: [
      {
        name: "name",
        type: "core::felt252",
      },
      {
        name: "age",
        type: "core::integer::u8",
      },
      {
        name: "gender",
        type: "core::felt252",
      },
      {
        name: "phone",
        type: "core::felt252",
      },
      {
        name: "ipfs_hash1",
        type: "core::felt252",
      },
      {
        name: "ipfs_hash2",
        type: "core::felt252",
      },
    ],
  },
  {
    name: "core::bool",
    type: "enum",
    variants: [
      {
        name: "False",
        type: "()",
      },
      {
        name: "True",
        type: "()",
      },
    ],
  },
  {
    name: "sn_stark_schedule::interfaces::istarkschedule::IStarkSchedule",
    type: "interface",
    items: [
      {
        name: "get_user_count",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::integer::u32",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "register_user",
        type: "function",
        inputs: [
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "age",
            type: "core::integer::u8",
          },
          {
            name: "gender",
            type: "core::felt252",
          },
          {
            name: "phone",
            type: "core::felt252",
          },
          {
            name: "ipfs_hash1",
            type: "core::felt252",
          },
          {
            name: "ipfs_hash2",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_profile",
        type: "function",
        inputs: [
          {
            name: "name",
            type: "core::felt252",
          },
          {
            name: "age",
            type: "core::integer::u8",
          },
          {
            name: "gender",
            type: "core::felt252",
          },
          {
            name: "phone",
            type: "core::felt252",
          },
          {
            name: "ipfs_hash1",
            type: "core::felt252",
          },
          {
            name: "ipfs_hash2",
            type: "core::felt252",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_blood_sugar_reading",
        type: "function",
        inputs: [
          {
            name: "reading",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_hba1c_reading",
        type: "function",
        inputs: [
          {
            name: "reading",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "update_weight",
        type: "function",
        inputs: [
          {
            name: "weight",
            type: "core::integer::u64",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "get_profile",
        type: "function",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "sn_stark_schedule::models::mstarkschedule::User",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "is_user_registered",
        type: "function",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::bool",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_blood_sugar_reading",
        type: "function",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_hba1c_reading",
        type: "function",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "get_weight",
        type: "function",
        inputs: [
          {
            name: "user_address",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [
          {
            type: "core::integer::u64",
          },
        ],
        state_mutability: "view",
      },
    ],
  },
  {
    name: "OwnableMixinImpl",
    type: "impl",
    interface_name: "openzeppelin_access::ownable::interface::OwnableABI",
  },
  {
    name: "openzeppelin_access::ownable::interface::OwnableABI",
    type: "interface",
    items: [
      {
        name: "owner",
        type: "function",
        inputs: [],
        outputs: [
          {
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        state_mutability: "view",
      },
      {
        name: "transfer_ownership",
        type: "function",
        inputs: [
          {
            name: "new_owner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "renounce_ownership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "transferOwnership",
        type: "function",
        inputs: [
          {
            name: "newOwner",
            type: "core::starknet::contract_address::ContractAddress",
          },
        ],
        outputs: [],
        state_mutability: "external",
      },
      {
        name: "renounceOwnership",
        type: "function",
        inputs: [],
        outputs: [],
        state_mutability: "external",
      },
    ],
  },
  {
    name: "constructor",
    type: "constructor",
    inputs: [
      {
        name: "owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::CounterIncreasedEvent",
    type: "event",
    members: [
      {
        kind: "data",
        name: "counter",
        type: "core::integer::u32",
      },
    ],
  },
  {
    kind: "struct",
    name: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::CounterDecreasedEvent",
    type: "event",
    members: [
      {
        kind: "data",
        name: "counter",
        type: "core::integer::u32",
      },
    ],
  },
  {
    kind: "struct",
    name: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::ProfileUpdatedEvent",
    type: "event",
    members: [
      {
        kind: "data",
        name: "user_address",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "data",
        name: "name",
        type: "core::felt252",
      },
      {
        kind: "data",
        name: "ipfs_hash1",
        type: "core::felt252",
      },
      {
        kind: "data",
        name: "ipfs_hash2",
        type: "core::felt252",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "struct",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    type: "event",
    members: [
      {
        kind: "key",
        name: "previous_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
      {
        kind: "key",
        name: "new_owner",
        type: "core::starknet::contract_address::ContractAddress",
      },
    ],
  },
  {
    kind: "enum",
    name: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "OwnershipTransferred",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferred",
      },
      {
        kind: "nested",
        name: "OwnershipTransferStarted",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
      },
    ],
  },
  {
    kind: "enum",
    name: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::Event",
    type: "event",
    variants: [
      {
        kind: "nested",
        name: "CounterIncreased",
        type: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::CounterIncreasedEvent",
      },
      {
        kind: "nested",
        name: "CounterDecreased",
        type: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::CounterDecreasedEvent",
      },
      {
        kind: "nested",
        name: "ProfileUpdated",
        type: "sn_stark_schedule::contracts::starkschedule::StarkSchedule::ProfileUpdatedEvent",
      },
      {
        kind: "flat",
        name: "OwnableEvent",
        type: "openzeppelin_access::ownable::ownable::OwnableComponent::Event",
      },
    ],
  },
];
