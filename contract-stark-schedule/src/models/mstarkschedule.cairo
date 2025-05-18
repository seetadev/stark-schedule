#[derive(Copy, Drop, Serde, starknet::Store)]
pub struct User {
    pub name: felt252,
    pub age: u8,
    pub gender: felt252,
    pub phone: felt252,
    pub ipfs_hash1: felt252,
    pub ipfs_hash2: felt252,
}