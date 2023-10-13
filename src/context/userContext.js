import React, { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneForOtp, setPhoneForOtp] = useState();
  const [resetToken, setResetToken] = useState();
  const [profileData, setProfileData] = useState();
  const [walletAmount, setWalletAmount] = useState();
  const [isExpertVerified, setExpertVerified] = useState();
  const [profileSetupData, setProfileSetupData] = useState();

  return (
    <UserContext.Provider
      value={{
        setPhoneForOtp,
        phoneForOtp,
        resetToken,
        setResetToken,
        profileData,
        setProfileData,
        walletAmount,
        setWalletAmount,
        isExpertVerified,
        setExpertVerified,
        profileSetupData,
        setProfileSetupData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
