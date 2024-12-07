import { TokenProvider, useToken } from './tokenContext';

const BASE_URL = "https://3pndzfcvne.us-east-1.awsapprunner.com";

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
            const response = await fetch(`${BASE_URL}${url}`, options);
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


    // Daily Goals 
    const getDailyGoal = async () => {
        return await apiCall('/nutrition/dailyGoal', 'GET');
    };

    const setDailyGoal = async ({ protein, carbs, fats, calories }) => {
        const dailyGoal = { protein: String(protein), carbs: String(carbs), fats: String(fats), calories: String(calories) };
        return await apiCall('/nutrition/dailyGoal', 'POST', dailyGoal);
    };


     // Preferences
    const getPreferences = async () => {
        return await apiCall('/preferences', 'GET');
    };

    const setPreferences = async ({ diet, intolerances }) => {
        const preferences = { diet, intolerances };
        console.log('Setting preferences', preferences)
        return await apiCall('/preferences', 'POST', preferences);
    };


     // Recipes
     const getRecipes = async () => {
        try {
            const preferences = await getPreferences();
            if (!preferences.success) {
                console.warn("Failed to fetch preferences. Fetching without preferences.");
            }
    
            let { diet, intolerances } = preferences;
    
            if (typeof diet === "string" && diet.includes(",")) {
                diet = diet.split(","); 
            }
            if (typeof intolerances === "string" && intolerances.includes(",")) {
                intolerances = intolerances.split(",");
            }
    
            const query = new URLSearchParams();
    
            if (diet && Array.isArray(diet) && diet.length > 0) {
                query.append("diet", diet[0]); 
            } else if (diet && typeof diet === "string") {
                query.append("diet", diet); 
            }
    
            if (intolerances && Array.isArray(intolerances)) {
                query.append("intolerances", intolerances.join(","));
            }
    
            const url = `/recipes?${query.toString()}`;
            console.log("Fetching recipes from URL:", url);
    
            return await apiCall(url, "GET");
        } catch (error) {
            console.error("Error in getRecipes:", error.message);
            return { success: false, recipes: [] };
        }
    };

    const getRecipeInformation = async (recipeId) => {
        return await apiCall(`/recipes/${recipeId}/info`, 'GET');
    }
    
    const getRecipeNutrition = async (recipeId) => {
        return await apiCall(`/recipes/${recipeId}/nutrition`, 'GET');
    }
    
    const registerRecipeConsumption = async (recipeId) => {
        return await apiCall(`/recipes/${recipeId}/register`, 'POST', {});
    }

    // Coverage = low, medium, high
    const generateRecipesByNutritionalGoals = async (coverage) => {
        return await apiCall(`/recipes/generateByNutritionalGoals?coverage=${coverage}`, 'GET');
    }


    // Transbank

    const transbankPayment = async () => {
        const body = { returnUrl: "https://fpjn-iic3143-1-github-io.vercel.app/homepage" };
        const response = await apiCall('/payment', 'POST', body);
        return response.redirect; 
    };

    const checkPaymentStatus = async (token_ws) => {
        return await apiCall(`/payment/status?token_ws=${token_ws}`, 'GET');
    };


    // Pantry
    const getPantry = async () => {
        return await apiCall('/pantry', 'GET');
    }

    /*
    El formato de ingredients
    {
        "ingredients": [
            {
                "name": "cinnamon",
                "quantity": {
                    "amount": 5,
                    "unit": "grams"
                }
            },
        ]
    }
    */
    const addIngredientsToPantry = async (ingredients) => {
        const body = { ingredients };
        return await apiCall('/pantry/addIngredients', 'POST', body);

    };


    // Si no mandas el recepie ID, se manda la lista de ingredientes que quieres eliminar.
    const removeIngredientsFromPantry = async ({ recipeId = null, ingredients = [] }) => {
        const body = recipeId ? { recipeId } : { ingredients };
        return await apiCall('/pantry/removeIngredients', 'POST', body);
    };

    const updatePantry = async ({recipeId = null, ingredients = []}) => {
        const body = recipeId ? { recipeId } : { ingredients };
        return await apiCall('/pantry/updatePantry', 'POST', body);
    }

    // Export History
    const exportRecipeConsumptionHistory = async () => {
        return await apiCall('/history/export', 'GET');
      };


    return {
        setDailyGoal,
        getDailyGoal,
        getPreferences,
        setPreferences,
        getRecipes,
        getRecipeInformation,
        getRecipeNutrition,
        registerRecipeConsumption,
        generateRecipesByNutritionalGoals,
        transbankPayment,
        checkPaymentStatus,
        getPantry,
        addIngredientsToPantry,
        removeIngredientsFromPantry,
        updatePantry,
        exportRecipeConsumptionHistory,

    };
}