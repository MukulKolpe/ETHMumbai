// @ts-nocheck comment
import React, { useEffect } from "react";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  useProver,
} from "@anon-aadhaar/react";
import { AnonAadhaarCore, packGroth16Proof } from "@anon-aadhaar/core";
import { useAccount } from "wagmi";

const AadharLogin = () => {
  const [anonAadhaar] = useAnonAadhaar();
  const [, latestProof] = useProver();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    if (anonAadhaar.status === "logged-in") {
      console.log(anonAadhaar.status);
    }
  }, [anonAadhaar]);

  let nullifierSeedString = "19566981402436238301701121519446139147227";
  let nullifierBigInt = BigInt(nullifierSeedString);

  const getIdentityParams = async () => {
    let proofObj = JSON.parse(latestProof);
    console.log(proofObj);
    console.log(proofObj.proof.groth16Proof);
    const PackedGroth16Proof = packGroth16Proof(proofObj.proof.groth16Proof);
    console.log(PackedGroth16Proof);
  };

  return (
    <div>
      {isConnected && (
        <div>
          <LogInWithAnonAadhaar
            nullifierSeed={nullifierBigInt}
            signer={address}
          />
          <p>{anonAadhaar?.status}</p>
          {anonAadhaar.status === "logged-in" && (
            <>
              <p>✅ Proof is valid</p>
              <p>Got your Aadhaar Identity Proof</p>
              <>Welcome anon!</>
              {latestProof && (
                <AnonAadhaarProof
                  code={JSON.stringify(JSON.parse(latestProof), null, 2)}
                />
              )}
              <button
                onClick={() => {
                  getIdentityParams();
                }}
              >
                Get Identity Params
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AadharLogin;
