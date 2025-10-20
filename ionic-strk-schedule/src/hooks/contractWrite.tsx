import { ABI } from "@/abis/abi";
import { useAccount, useContract } from "@starknet-react/core";
import { type Abi, shortString } from "starknet";
import { useState } from "react";

export function useContractInstance() {
  const { contract } = useContract({
    abi: ABI as Abi,
    address: import.meta.env.VITE_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  });

  return contract;
}
// In contractWrite.tsx:
export function useRegisterUser() {
  const contract = useContractInstance();
  const { account } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ transactionHash: string } | null>(null);

  const registerUser = async (
    name: string,
    age: string,
    gender: string,
    phone: string,
    ipfsHash1: string,
    ipfsHash2: string
  ) => {
    if (!contract) return;
    if (!account) {
      throw new Error("Wallet account not connected");
    }

    setIsPending(true);
    setError(null);

    try {
      const nameAsFelt = shortString.encodeShortString(
        name.trim().substring(0, 30)
      );
      const genderAsFelt = shortString.encodeShortString(
        gender.trim().substring(0, 30)
      );
      const ageAsU8 = parseInt(age) || 0;

      const phoneAsFelt = shortString.encodeShortString(
        phone.trim().substring(0, 30)
      );
      const ipfsHashAsFelt1 = ipfsHash1
        ? shortString.encodeShortString(ipfsHash1.substring(0, 31))
        : "0";
      const ipfsHashAsFelt2 = ipfsHash2
        ? shortString.encodeShortString(ipfsHash2.substring(0, 31))
        : "0";

      const calldata = [
        nameAsFelt,
        ageAsU8.toString(),
        genderAsFelt,
        phoneAsFelt,
        ipfsHashAsFelt1,
        ipfsHashAsFelt2,
      ];

      console.log("Sending calldata:", calldata);

      // Send transaction
      const response = await account.execute({
        contractAddress: contract.address,
        entrypoint: "register_user",
        calldata,
      });

      console.log("Transaction response:", response);

      setData({ transactionHash: response.transaction_hash });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        throw err;
      }
      console.error("Unexpected error:", err);
      throw new Error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return {
    registerUser,
    data,
    isPending,
    isError: !!error,
    error,
  };
}
// 2. Update Profile
export function useUpdateProfile() {
  const contract = useContractInstance();
  const { account } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ transactionHash: string } | null>(null);

  const updateProfile = async (
    name: string,
    age: string | number,
    gender: string,
    phone: string,
    ipfsHash1: string,
    ipfsHash2: string
  ) => {
    if (!contract) return;
    if (!account) {
      throw new Error("Wallet account not connected");
    }

    setIsPending(true);
    setError(null);

    try {
      // Convert strings to Cairo felt252 using shortString
      const nameAsFelt = shortString.encodeShortString(
        name.trim().substring(0, 30)
      );
      const genderAsFelt = shortString.encodeShortString(
        gender.trim().substring(0, 30)
      );

      const ageAsU8 = typeof age === "string" ? parseInt(age) || 0 : age;
      const phoneAsFelt = shortString.encodeShortString(
        phone.trim().substring(0, 30)
      );
      const ipfsHashAsFelt1 = ipfsHash1
        ? shortString.encodeShortString(ipfsHash1.substring(0, 31))
        : "0";
      const ipfsHashAsFelt2 = ipfsHash2
        ? shortString.encodeShortString(ipfsHash2.substring(0, 31))
        : "0";

      const calldata = [
        nameAsFelt,
        ageAsU8.toString(),
        genderAsFelt,
        phoneAsFelt,
        ipfsHashAsFelt1,
        ipfsHashAsFelt2,
      ];

      console.log("Sending update profile calldata:", calldata);

      // Send transaction using account.execute instead of contract.invoke
      const response = await account.execute({
        contractAddress: contract.address,
        entrypoint: "update_profile",
        calldata,
      });

      console.log("Update profile response:", response);

      setData({ transactionHash: response.transaction_hash });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        throw err;
      }
      console.error("Unexpected error:", err);
      throw new Error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return {
    updateProfile,
    data,
    isPending,
    isError: !!error,
    error,
  };
}

// 4. Update Blood Sugar Reading
export function useUpdateBloodSugarReading() {
  const contract = useContractInstance();
  const { account } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ transactionHash: string } | null>(null);

  const updateBloodSugarReading = async (reading: number | string) => {
    if (!contract) return;
    if (!account) throw new Error("Wallet account not connected");

    setIsPending(true);
    setError(null);

    try {
      const readingAsU64 =
        typeof reading === "string" ? parseInt(reading) || 0 : reading;
      const calldata = [readingAsU64.toString()];

      const response = await account.execute({
        contractAddress: contract.address,
        entrypoint: "update_blood_sugar_reading",
        calldata,
      });

      setData({ transactionHash: response.transaction_hash });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        throw err;
      }
      throw new Error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return { updateBloodSugarReading, data, isPending, isError: !!error, error };
}

// 5. Update HbA1c Reading
export function useUpdateHba1cReading() {
  const contract = useContractInstance();
  const { account } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ transactionHash: string } | null>(null);

  const updateHba1cReading = async (reading: number | string) => {
    if (!contract) return;
    if (!account) throw new Error("Wallet account not connected");

    setIsPending(true);
    setError(null);

    try {
      const readingAsU64 =
        typeof reading === "string" ? parseInt(reading) || 0 : reading;
      const calldata = [readingAsU64.toString()];

      const response = await account.execute({
        contractAddress: contract.address,
        entrypoint: "update_hba1c_reading",
        calldata,
      });

      setData({ transactionHash: response.transaction_hash });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        throw err;
      }
      throw new Error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return { updateHba1cReading, data, isPending, isError: !!error, error };
}

// 6. Update Weight
export function useUpdateWeight() {
  const contract = useContractInstance();
  const { account } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ transactionHash: string } | null>(null);

  const updateWeight = async (weight: number | string) => {
    if (!contract) return;
    if (!account) throw new Error("Wallet account not connected");

    setIsPending(true);
    setError(null);

    try {
      const weightAsU64 =
        typeof weight === "string" ? parseInt(weight) || 0 : weight;
      const calldata = [weightAsU64.toString()];

      const response = await account.execute({
        contractAddress: contract.address,
        entrypoint: "update_weight",
        calldata,
      });

      setData({ transactionHash: response.transaction_hash });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
        throw err;
      }
      throw new Error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return { updateWeight, data, isPending, isError: !!error, error };
}
