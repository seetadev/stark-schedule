use starknet::ContractAddress;
use sn_stark_schedule::User;

#[starknet::interface]
pub trait IStarkSchedule<T> {
    fn get_user_count(self: @T) -> u32;
    fn register_user(
        ref self: T,
        name: felt252,
        age: u8,
        gender: felt252,
        phone: felt252,
        ipfs_hash1: felt252,
        ipfs_hash2: felt252
    );
    fn update_profile(
        ref self: T,
        name: felt252,
        age: u8,
        gender: felt252,
        phone: felt252,
        ipfs_hash1: felt252,
        ipfs_hash2: felt252
    );
    fn update_blood_sugar_reading(
        ref self: T,
        reading: u64
    );
    fn update_hba1c_reading(
        ref self: T,
        reading: u64
    );
    fn update_weight(
        ref self: T,
        weight: u64
    );
    fn get_profile(self: @T, user_address: ContractAddress) -> User; 
    fn is_user_registered(self: @T, user_address: ContractAddress) -> bool; // New function
    fn get_blood_sugar_reading(self: @T, user_address: ContractAddress) -> u64;
    fn get_hba1c_reading(self: @T, user_address: ContractAddress) -> u64;
    fn get_weight(self: @T, user_address: ContractAddress) -> u64;
}