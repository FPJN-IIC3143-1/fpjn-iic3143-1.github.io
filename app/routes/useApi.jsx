import { TokenProvider, useToken } from './tokenContext';

export default function useApi() {
    const { token, tokenReady } = useToken();

    const apiCall = async (url, method, body = null) => {
        if (!tokenReady) {
            console.error("Token not ready yet. Please wait...");
            return { success: false, message: "Token not ready" };
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
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

    const getDailyGoal = async () => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/nutrition/dailyGoal";
        return await apiCall(url, 'GET');
    };

    const setDailyGoal = async ({ protein, carbs, fats, calories }) => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/nutrition/dailyGoal";
        const dailyGoal = { protein: String(protein), carbs: String(carbs), fats: String(fats), calories: String(calories) };
        return await apiCall(url, 'POST', dailyGoal);
    };

    const getPreferences = async () => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/preferences";
        return await apiCall(url, 'GET');
    };

    const setPreferences = async ({ diet, intolerances }) => {
        const url = "https://3pndzfcvne.us-east-1.awsapprunner.com/preferences";
        const preferences = { diet, intolerances };
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