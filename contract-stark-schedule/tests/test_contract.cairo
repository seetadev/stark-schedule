use sn_cairo_workshop::{
    IStarkSchedule, 
    IStarkScheduleDispatcher, 
    IStarkScheduleDispatcherTrait,
    IStarkScheduleSafeDispatcher,
    IStarkScheduleSafeDispatcherTrait,
    User
};
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare, start_prank, stop_prank, CheatTarget};
use starknet::{ContractAddress, contract_address_const, get_caller_address};

fn deploy_contract() -> ContractAddress {
    // Deploy with owner set to a test address
    let owner = contract_address_const::<0x123>();
    
    let contract = declare("StarkSchedule").unwrap().contract_class();
    let constructor_args = array![owner.into()];
    let (contract_address, _) = contract.deploy(@constructor_args).unwrap();
    contract_address
}

#[test]
fn test_user_registration() {
    let contract_address = deploy_contract();
    let user_address = contract_address_const::<0x456>();
    
    // Set caller to test user address
    start_prank(CheatTarget::One(contract_address), user_address);
    
    let dispatcher = IStarkScheduleDispatcher { contract_address };
    
    // Check initial state
    let user_count_before = dispatcher.get_user_count();
    assert(user_count_before == 0, 'Initial count should be 0');
    assert(!dispatcher.is_user_registered(user_address), 'Should not be registered');
    
    // Register user
    dispatcher.register_user(
        'John Doe', // name
        30, // age
        'male', // gender
        175, // height in cm
        750, // weight (75.0 kg)
        'kg', // weight unit
        'ipfs_hash_123' // ipfs hash
    );
    
    // Check after registration
    let user_count_after = dispatcher.get_user_count();
    assert(user_count_after == 1, 'Count should increment');
    assert(dispatcher.is_user_registered(user_address), 'Should be registered');
    
    // Get and verify profile
    let user = dispatcher.get_profile(user_address);
    assert(user.name == 'John Doe', 'Name mismatch');
    assert(user.age == 30, 'Age mismatch');
    
    stop_prank(CheatTarget::One(contract_address));
}
#[test]
fn test_profile_update() {
    let contract_address = deploy_contract();
    let user_address = contract_address_const::<0x456>();
    
    // Set caller to test user address
    start_prank(CheatTarget::One(contract_address), user_address);
    
    let dispatcher = IStarkScheduleDispatcher { contract_address };
    
    // Register user first
    dispatcher.register_user(
        'John Doe', 30, 'male', 175, 750, 'kg', 'ipfs_hash_123'
    );
    
    // Update profile
    dispatcher.update_profile(
        'John Updated', 31, 'male', 176, 760, 'kg', 'ipfs_hash_updated'
    );
    
    // Verify updates
    let updated_user = dispatcher.get_profile(user_address);
    assert(updated_user.name == 'John Updated', 'Name not updated');
    assert(updated_user.age == 31, 'Age not updated');
    assert(updated_user.ipfs_hash == 'ipfs_hash_updated', 'IPFS hash not updated');
    
    stop_prank(CheatTarget::One(contract_address));
}
#[test]
fn test_health_metrics_update() {
    let contract_address = deploy_contract();
    let user_address = contract_address_const::<0x456>();
    
    start_prank(CheatTarget::One(contract_address), user_address);
    let dispatcher = IStarkScheduleDispatcher { contract_address };
    
    // Register user first
    dispatcher.register_user(
        'John Doe', 30, 'male', 175, 750, 'kg', 'ipfs_hash_123'
    );
    
    // Update blood sugar
    dispatcher.update_blood_sugar_reading(120);
    assert(dispatcher.get_blood_sugar_reading(user_address) == 120, 'Blood sugar not updated');
    
    // Update HbA1c
    dispatcher.update_hba1c_reading(57); // 5.7%
    assert(dispatcher.get_hba1c_reading(user_address) == 57, 'HbA1c not updated');
    
    // Update weight
    dispatcher.update_weight(760); // 76.0 kg
    assert(dispatcher.get_weight(user_address) == 760, 'Weight not updated');
    
    stop_prank(CheatTarget::One(contract_address));
}
#[test]
#[should_panic(expected: ('User already registered',))]
fn test_cannot_register_twice() {
    let contract_address = deploy_contract();
    let user_address = contract_address_const::<0x456>();
    
    start_prank(CheatTarget::One(contract_address), user_address);
    let dispatcher = IStarkScheduleDispatcher { contract_address };
    
    // Register user
    dispatcher.register_user(
        'John Doe', 30, 'male', 175, 750, 'kg', 'ipfs_hash_123'
    );
    
    // Try to register again - should fail
    dispatcher.register_user(
        'John Again', 30, 'male', 175, 750, 'kg', 'ipfs_hash_123'
    );
    
    stop_prank(CheatTarget::One(contract_address));
}

#[test]
#[should_panic(expected: ('User not registered',))]
fn test_cannot_update_unregistered_user() {
    let contract_address = deploy_contract();
    let user_address = contract_address_const::<0x456>();
    
    start_prank(CheatTarget::One(contract_address), user_address);
    let dispatcher = IStarkScheduleDispatcher { contract_address };
    
    // Try to update profile without registering first
    dispatcher.update_profile(
        'John Updated', 31, 'male', 176, 760, 'kg', 'ipfs_hash_updated'
    );
    
    stop_prank(CheatTarget::One(contract_address));
}