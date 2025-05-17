pub mod models {
    pub mod mstarkschedule;
}

pub mod interfaces {
    pub mod istarkschedule;
}

pub mod error {
    pub mod errstarkschedule;
}

pub mod contracts {
    pub mod starkschedule;
}

// Re-exports for convenience
pub use models::mstarkschedule::User;
pub use interfaces::istarkschedule::IStarkSchedule;
pub use contracts::starkschedule::StarkSchedule;