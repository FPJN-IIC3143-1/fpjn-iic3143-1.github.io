import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { SignJWT } from 'jose';

const TokenContext = createContext();

const secretKey = new TextEncoder().encode('-KJGzSyN_xPJFu058EIb-fTvEkFCna1QLdbERahXMMxKRJprkB4ig31ZL8klEWJl');

export const TokenProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();
    const [token, setToken] = useState(null);  
    const [tokenReady, setTokenReady] = useState(false);

    const generateToken = useCallback(async () => {
        if (!user?.email || token) {
            console.log("Skipping token generation - either user email is missing or token already exists.");
            return;
        }

        try {
            console.log("Generating JWT token...");
            const generatedToken = await new SignJWT({ email: user.email })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(secretKey);

            setToken(generatedToken); 
            setTokenReady(true);  
            console.log("JWT Token generated:", generatedToken);
        } catch (error) {
            console.error("Error generating JWT token:", error);
        }
    }, [user?.email, token]);

    useEffect(() => {
        console.log("Checking authentication status in TokenProvider:", {
            isAuthenticated,
            userEmail: user?.email,
            tokenExists: !!token,
        });
        
        if (isAuthenticated && user?.email && !token) {
            console.log("User authenticated and no token present, generating token...");
            generateToken();
        } else {
            console.log("Token already exists or user is not authenticated.");
        }
    }, [isAuthenticated, user?.email, generateToken, token]);

    return (
        <TokenContext.Provider value={{ token, tokenReady }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
};