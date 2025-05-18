
#[starknet::contract]
pub mod StarkSchedule {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess, StoragePathEntry, Map};
    use openzeppelin_access::ownable::OwnableComponent;

    use sn_stark_schedule::User;
    use sn_stark_schedule::error::errstarkschedule::Errors;
    use sn_stark_schedule::IStarkSchedule;
    
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    // Ownable Mixin
    #[abi(embed_v0)]
    impl OwnableMixinImpl = OwnableComponent::OwnableMixinImpl<ContractState>;
    impl InternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        counter: u32,
        user_registered: Map<ContractAddress, bool>,
        users: Map<ContractAddress, User>, // Map wallet address to User struct
        user_blood_sugar_readings: Map<ContractAddress, u64>,
        user_hba1c_readings: Map<ContractAddress, u64>,
        user_weights: Map<ContractAddress, u64>,
        // Owner address
        owner: ContractAddress,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        CounterIncreased: CounterIncreasedEvent,
        CounterDecreased: CounterDecreasedEvent,
        ProfileUpdated: ProfileUpdatedEvent, // Add this
        #[flat]
        OwnableEvent: OwnableComponent::Event
    }
    #[derive(Drop, starknet::Event)]
    struct CounterIncreasedEvent {
       counter: u32,
    }
    #[derive(Drop, starknet::Event)]
    struct CounterDecreasedEvent {
       counter: u32,
    }
    #[derive(Drop, starknet::Event)]
    struct ProfileUpdatedEvent { // Define this event struct
        user_address: ContractAddress,
        name: felt252,
        ipfs_hash1: felt252, // Or other relevant fields
        ipfs_hash2: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.counter.write(0);
        self.ownable.initializer(owner);
    }

    #[abi(embed_v0)]
    impl CounterImpl of IStarkSchedule<ContractState> {

        // view only functions
        fn get_user_count(self: @ContractState) -> u32 {
            self.counter.read()
        }
        fn is_user_registered(self: @ContractState, user_address: ContractAddress) -> bool {
            self.user_registered.entry(user_address).read()
        }
        fn get_profile(self: @ContractState, user_address: ContractAddress) -> User {
            assert(self.user_registered.entry(user_address).read(), Errors::USER_NOT_REGISTERED);
            return self.users.entry(user_address).read();
        }
        fn get_blood_sugar_reading(self: @ContractState, user_address: ContractAddress) -> u64 {
            assert(self.user_registered.entry(user_address).read(), Errors::USER_NOT_REGISTERED);
            return self.user_blood_sugar_readings.entry(user_address).read();
        }
        fn get_hba1c_reading(self: @ContractState, user_address: ContractAddress) -> u64 {
            assert(self.user_registered.entry(user_address).read(), Errors::USER_NOT_REGISTERED);
            return self.user_hba1c_readings.entry(user_address).read();
        }
        fn get_weight(self: @ContractState, user_address: ContractAddress) -> u64 {
            assert(self.user_registered.entry(user_address).read(), Errors::USER_NOT_REGISTERED);
            return self.user_weights.entry(user_address).read();
        }

        // state changing functions
        fn register_user(
            ref self: ContractState,
            name: felt252,
            age: u8,
            gender: felt252,
            phone: felt252,
            ipfs_hash1: felt252,
            ipfs_hash2: felt252
        ) {
            let caller = get_caller_address();
            // assert(caller.is_non_zero(), Errors::INVALID_CALLER);
            assert(!self.user_registered.entry(caller).read(), Errors::USER_ALREADY_REGISTERED);

            let updated_user = User {
                name: name,
                age: age,
                gender: gender,
                phone: phone,
                ipfs_hash1: ipfs_hash1,
                ipfs_hash2: ipfs_hash2,
            };
            self.users.entry(caller).write(updated_user);
            self.user_registered.entry(caller).write(true);
            self.user_blood_sugar_readings.entry(caller).write(0);
            self.user_hba1c_readings.entry(caller).write(0);
            self.user_weights.entry(caller).write(0);
            self.counter.write(self.counter.read() + 1); // Increment the counter
            self.emit(CounterIncreasedEvent {
                counter: self.counter.read(),
            });

            self.emit(ProfileUpdatedEvent {
                user_address: caller,
                name: name,
                ipfs_hash1: ipfs_hash1,
                ipfs_hash2: ipfs_hash2,
            });
        }
        fn update_profile(
            ref self: ContractState,
            name: felt252,
            age: u8,
            gender: felt252,
            phone: felt252,
            ipfs_hash1: felt252,
            ipfs_hash2: felt252
        ) {
            let caller = get_caller_address();
            assert(self.user_registered.entry(caller).read(), Errors::USER_NOT_REGISTERED);

            let updated_user = User {
                name: name,
                age: age,
                gender: gender,
                phone: phone,
                ipfs_hash1: ipfs_hash1,
                ipfs_hash2: ipfs_hash2,
            };
            self.users.entry(caller).write(updated_user);

            self.emit(ProfileUpdatedEvent {
                user_address: caller,
                name: name,
                ipfs_hash1: ipfs_hash1,
                ipfs_hash2: ipfs_hash2,
            });
        }
        
        fn update_blood_sugar_reading(
            ref self: ContractState,
            reading: u64
        ) {
            let caller = get_caller_address();
            assert(self.user_registered.entry(caller).read(), Errors::USER_NOT_REGISTERED);
            self.user_blood_sugar_readings.entry(caller).write(reading);
        }
        fn update_hba1c_reading(
            ref self: ContractState,
            reading: u64
        ) {
            let caller = get_caller_address();
            assert(self.user_registered.entry(caller).read(), Errors::USER_NOT_REGISTERED);
            self.user_hba1c_readings.entry(caller).write(reading);
        }
        fn update_weight(
            ref self: ContractState,
            weight: u64
        ) {
            let caller = get_caller_address();
            assert(self.user_registered.entry(caller).read(), Errors::USER_NOT_REGISTERED);
            self.user_weights.entry(caller).write(weight);
        }
    }
}
