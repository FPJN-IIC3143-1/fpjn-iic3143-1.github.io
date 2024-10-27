import { useAuth0 } from '@auth0/auth0-react';
import { SignJWT } from 'jose';
import { useEffect, useRef, useState } from 'react';

const secretKey = new TextEncoder().encode('-KJGzSyN_xPJFu058EIb-fTvEkFCna1QLdbERahXMMxKRJprkB4ig31ZL8klEWJl');

export default function useApi() {
    const { user } = useAuth0();
    const tokenRef = useRef();
    const [tokenReady, setTokenReady] = useState(false);

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await new SignJWT({ email: user?.email || "email@email.com" })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('2h')
                    .sign(secretKey);
                tokenRef.current = token;
                setTokenReady(true);
                console.log("Token generated:", token);
            } catch (err) {
                console.error("Token generation error: ", err);
            }
        };

        generateToken();
    }, [user]);

    const apiCall = async (url, method, body = null) => {
        if (!tokenReady) {
            console.error("Token not ready yet. Please wait...");
            return { success: false, message: "Token not ready" };
        }

        const headers = {
            'Authorization': `Bearer ${tokenRef.current}`,
            'Content-Type': 'application/json'
        };

        const options = {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(`Request failed: ${response.status} - ${errorMsg}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error with ${method} request to ${url}:`, error.message);
            return { success: false, message: error.message };
        }
    };

    const setDailyGoal = async ({ protein, carbs, fats, calories }) => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/nutrition/dailyGoal";
        const dailyGoal = { protein: String(protein), carbs: String(carbs), fats: String(fats), calories: String(calories) };
        return await apiCall(url, 'POST', dailyGoal);
    };

    const getDailyGoal = async () => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/nutrition/dailyGoal";
        return await apiCall(url, 'GET');
    };

    const getPreferences = async () => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/preferences";
        return await apiCall(url, 'GET');
    };

    const setPreferences = async ({ diet, intolerances }) => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/preferences";
        const preferences = { diet, intolerances: intolerances.join(',') };
        return await apiCall(url, 'POST', preferences);
    };

    const getRecipes = async () => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/recipes";
        return await apiCall(url, 'GET');
    };

    return {
        setDailyGoal,
        getDailyGoal,
        getPreferences,
        setPreferences,
        getRecipes
    };
}