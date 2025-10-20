import axios from "axios";
import FormData from "form-data";

/**
 * Interface for user profile data to be stored in IPFS
 */
interface ProfileIPFSData {
  email: string;
  phone: string;
  dateOfBirth?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
}
// Remove this import - we'll use browser's FormData
// import FormData from "form-data";

/**
 * Uploads user profile data to IPFS using Pinata
 * @param profileData User profile data object
 * @returns IPFS CID (Content Identifier)
 */
export async function uploadProfileToPinata(
  profileData: Partial<ProfileIPFSData>
): Promise<string> {
  try {
    // Get Pinata API keys from environment variables
    const apiKey = import.meta.env.VITE_PINATA_API_KEY;
    const apiSecret = import.meta.env.VITE_PINATA_API_SECRET;

    if (!apiKey || !apiSecret) {
      throw new Error("Pinata API keys not found in environment variables");
    }

    // Add timestamps
    const dataWithTimestamps = {
      ...profileData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Format the data as JSON
    const jsonData = JSON.stringify(dataWithTimestamps);

    // Create a file object - this works better with FormData
    const file = new File([jsonData], `profile-${Date.now()}.json`, {
      type: "application/json",
    });

    // Create form data (use browser's FormData)
    const formData = new FormData();
    formData.append("file", file);

    // Add metadata
    const metadata = JSON.stringify({
      name: `User Profile Data`,
      keyvalues: {
        type: "profile",
        createdAt: new Date().toISOString(),
      },
    });
    formData.append("pinataMetadata", metadata);

    // Add options
    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", options);

    // Upload to IPFS (with 3 retries)
    let cid;
    let attempts = 0;

    while (attempts < 3) {
      try {
        console.log(`Uploading to Pinata IPFS (attempt ${attempts + 1}/3)...`);

        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              // Let axios set the appropriate Content-Type with boundary
              // No need to manually set the boundary
              pinata_api_key: apiKey,
              pinata_secret_api_key: apiSecret,
            },
            // Add this to ensure proper handling of FormData
            transformRequest: (data, headers) => {
              return data;
            },
          }
        );

        cid = response.data.IpfsHash;
        break;
      } catch (error) {
        attempts++;
        console.error("Attempt failed:", error);
        if (attempts >= 3) throw error;
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    console.log(`Successfully uploaded to Pinata IPFS with CID: ${cid}`);
    return cid;
  } catch (error) {
    console.error("Failed to upload to Pinata IPFS:", error);
    throw new Error(
      `Pinata IPFS upload failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Retrieves user profile data from IPFS using the CID
 * @param cid IPFS Content Identifier (hash)
 * @returns User profile data object or null if retrieval fails
 */
export async function retrieveProfileFromIpfs(
  cid: string
): Promise<ProfileIPFSData | null> {
  try {
    // Use Pinata's gateway or another public IPFS gateway
    const gateway =
      import.meta.env.VITE_IPFS_GATEWAY || "https://gateway.pinata.cloud/ipfs/";
    const url = `${gateway}${cid}`;

    console.log(`Fetching profile data from: ${url}`);

    const response = await axios.get(url);

    if (response.status !== 200) {
      throw new Error(`Failed to retrieve data: ${response.statusText}`);
    }

    console.log("Successfully retrieved profile data from IPFS");
    return response.data as ProfileIPFSData;
  } catch (error) {
    console.error("Failed to retrieve data from IPFS:", error);
    return null;
  }
}
