import { ABI } from "@/abis/abi";
import { useReadContract } from "@starknet-react/core";
import { useCallback } from "react";
import { type Abi } from "starknet";

interface UseIsUserRegisteredProps {
  accountAddress: `0x${string}` | undefined;
}

export function useIsUserRegistered({
  accountAddress,
}: UseIsUserRegisteredProps) {
  const {
    data: readData,
    refetch: dataRefetch,
    isError: readIsError,
    isLoading: readIsLoading,
    error: readError,
  } = useReadContract({
    functionName: "is_user_registered",
    args: accountAddress ? [accountAddress] : [],
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    watch: true,
    refetchInterval: 1000,
    enabled: !!accountAddress,
  });

  return {
    isRegistered: readData,
    refetchIsRegistered: dataRefetch,
    isError: readIsError,
    isLoading: readIsLoading,
    error: readError,
  };
}

// 1. Get Profile hook
interface UseGetProfileProps {
  accountAddress: `0x${string}` | undefined;
}

export function useGetProfile({ accountAddress }: UseGetProfileProps) {
  const {
    data: profileData,
    refetch: profileRefetch,
    isError: profileIsError,
    isLoading: profileIsLoading,
    error: profileError,
  } = useReadContract({
    functionName: "get_profile",
    args: accountAddress ? [accountAddress] : [],
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    watch: false,
    // refetchInterval: 1000,
    enabled: !!accountAddress,
  });
  const refreshProfile = useCallback(() => {
    console.log("Manually refreshing profile data");
    profileRefetch();
  }, [profileRefetch]);
  return {
    profile: profileData,
    refetchProfile: refreshProfile,
    isError: profileIsError,
    isLoading: profileIsLoading,
    error: profileError,
  };
}

// 2. Get Blood Sugar Readings hook
interface UseGetBloodSugarReadingsProps {
  accountAddress: `0x${string}` | undefined;
}

export function useGetBloodSugarReadings({
  accountAddress,
}: UseGetBloodSugarReadingsProps) {
  const {
    data: readingsData,
    refetch: readingsRefetch,
    isError: readingsIsError,
    isLoading: readingsIsLoading,
    error: readingsError,
  } = useReadContract({
    functionName: "get_blood_sugar_reading",
    args: accountAddress ? [accountAddress] : [],
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    watch: true,
    refetchInterval: 1000,
    enabled: !!accountAddress,
  });

  return {
    readings: readingsData,
    refetchReadings: readingsRefetch,
    isError: readingsIsError,
    isLoading: readingsIsLoading,
    error: readingsError,
  };
}

// 2. Get Blood Sugar Readings hook
interface UseGetHbProps {
  accountAddress: `0x${string}` | undefined;
}

export function useGetHbReadings({ accountAddress }: UseGetHbProps) {
  const {
    data: hbReadingsData,
    refetch: readingsRefetch,
    isError: readingsIsError,
    isLoading: readingsIsLoading,
    error: readingsError,
  } = useReadContract({
    functionName: "get_hba1c_reading",
    args: accountAddress ? [accountAddress] : [],
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    watch: true,
    refetchInterval: 1000,
    enabled: !!accountAddress,
  });

  return {
    readings: hbReadingsData,
    refetchReadings: readingsRefetch,
    isError: readingsIsError,
    isLoading: readingsIsLoading,
    error: readingsError,
  };
}

// 3. Get Weight hook
interface UseGetWeightProps {
  accountAddress: `0x${string}` | undefined;
}

export function useGetWeight({ accountAddress }: UseGetWeightProps) {
  const {
    data: weightData,
    refetch: weightRefetch,
    isError: weightIsError,
    isLoading: weightIsLoading,
    error: weightError,
  } = useReadContract({
    functionName: "get_weight",
    args: accountAddress ? [accountAddress] : [],
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    watch: true,
    refetchInterval: 1000,
    enabled: !!accountAddress,
  });

  return {
    weight: weightData,
    refetchWeight: weightRefetch,
    isError: weightIsError,
    isLoading: weightIsLoading,
    error: weightError,
  };
}

// 4. Get Weight Unit hook
interface UseGetWeightUnitProps {
  accountAddress: `0x${string}` | undefined;
}

export function useGetWeightUnit({ accountAddress }: UseGetWeightUnitProps) {
  const {
    data: unitData,
    refetch: unitRefetch,
    isError: unitIsError,
    isLoading: unitIsLoading,
    error: unitError,
  } = useReadContract({
    functionName: "get_weight_unit",
    args: accountAddress ? [accountAddress] : [],
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    watch: true,
    refetchInterval: 1000,
    enabled: !!accountAddress,
  });

  return {
    unit: unitData,
    refetchUnit: unitRefetch,
    isError: unitIsError,
    isLoading: unitIsLoading,
    error: unitError,
  };
}
