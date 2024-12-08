import LandingButton from "../components/landingButton";
import RecipeCard from "../components/recipeCard";
import DataCard from "../components/dataCard";
import NotificationLogOut from "../components/notificationLogOut";
import PantryCard from "../components/pantryCard";
import WelcomePopUp from "../components/welcomePopUp"; // Asegúrate de que la ruta sea correcta
import SideBar from "../components/sideBar";
import { useState, useEffect } from "react";

export default function TestPage() { 
    // This is a test page to see if the components are working correctly
    // Checkear si el usuario está autenticado
    const [showWelcome, setShowWelcome] = useState(false); // Start as false
    
    useEffect(() => {
        // Check if first time user
        const hasVisited = localStorage.getItem('hasVisitedBefore');
        if (!hasVisited) {
        setShowWelcome(true);
        }
    }, []);

    const handleWelcomeSubmit = () => {
        localStorage.setItem('hasVisitedBefore', 'true');
        setShowWelcome(false);
    };
    
    const pantryItems = [{ id: 1, quantity: '10', name: 'Huevos' },
        { id: 2, quantity: '530g', name: 'Pollo' },
        { id: 3, quantity: '1kg', name: 'Cerdo' },
        { id: 4, quantity: '4un', name: 'Yogurt Natural' },
        { id: 5, quantity: '250g', name: 'Mantequilla' },
        { id: 6, quantity: '10un', name: 'Tomates' },
        { id: 7, quantity: '1un', name: 'Lechuga' },
        { id: 8, quantity: '7un', name: 'Paltas' },
        { id: 9, quantity: '100g', name: 'Semillas Chía' },
        { id: 10, quantity: '13un', name: 'Papas' },
        { id: 11, quantity: '4un', name: 'Zanahoria' },
        { id: 12, quantity: '5un', name: 'Cebolla' },
        { id: 13, quantity: '2un', name: 'Ajo' },
        { id: 14, quantity: '3un', name: 'Pimentón' },
        { id: 15, quantity: '2un', name: 'Zapallo' },
        { id: 21, quantity: '10', name: 'Huevos' },
        { id: 22, quantity: '530g', name: 'Pollo' },
        { id: 23, quantity: '1kg', name: 'Cerdo' },
        { id: 24, quantity: '4un', name: 'Yogurt Natural' },
        { id: 25, quantity: '250g', name: 'Mantequilla' },
        { id: 26, quantity: '10un', name: 'Tomates' },
        { id: 27, quantity: '1un', name: 'Lechuga' },
        { id: 28, quantity: '7un', name: 'Paltas' },
        { id: 29, quantity: '100g', name: 'Semillas Chía' },
        { id: 210, quantity: '13un', name: 'Papas' },
        { id: 211, quantity: '4un', name: 'Zanahoria' },
        { id: 212, quantity: '5un', name: 'Cebolla' },
        { id: 213, quantity: '2un', name: 'Ajo' },
        { id: 214, quantity: '1kg', name: 'Harina' },
        { id: 215, quantity: '2un', name: 'Zapallo' },
        { id: 216, quantity: '2kg', name: 'Tallarines' },
        { id: 217, quantity: '1kg', name: 'Arroz' },
        { id: 31, quantity: '10', name: 'Huevos' },
        { id: 32, quantity: '530g', name: 'Pollo' },
        { id: 33, quantity: '1kg', name: 'Cerdo' },
        { id: 34, quantity: '4un', name: 'Yogurt Natural' },
        { id: 35, quantity: '250g', name: 'Mantequilla' },
        { id: 36, quantity: '10un', name: 'Tomates' },
        { id: 37, quantity: '1un', name: 'Lechuga' },
        { id: 38, quantity: '7un', name: 'Paltas' },
        { id: 39, quantity: '100g', name: 'Semillas Chía' },
        { id: 310, quantity: '13un', name: 'Papas' },
        { id: 311, quantity: '4un', name: 'Zanahoria' },
        { id: 312, quantity: '5un', name: 'Cebolla' },
        { id: 313, quantity: '2un', name: 'Ajo' },
        { id: 314, quantity: '1kg', name: 'Harina' },
        { id: 315, quantity: '2un', name: 'Zapallo' },
        { id: 316, quantity: '2kg', name: 'Tallarines' },
        { id: 317, quantity: '1kg', name: 'Arroz' },
        { id: 41, quantity: '10', name: 'Huevos' },
        { id: 42, quantity: '530g', name: 'Pollo' },
        { id: 43, quantity: '1kg', name: 'Cerdo' },
        { id: 44, quantity: '4un', name: 'Yogurt Natural' },
        { id: 45, quantity: '250g', name: 'Mantequilla' },
        { id: 46, quantity: '10un', name: 'Tomates' },
        { id: 47, quantity: '1un', name: 'Lechuga' },
        { id: 48, quantity: '7un', name: 'Paltas' },
        { id: 49, quantity: '100g', name: 'Semillas Chía' },
        { id: 410, quantity: '13un', name: 'Papas' },
        { id: 411, quantity: '4un', name: 'Zanahoria' },
        { id: 412, quantity: '5un', name: 'Cebolla' },
        { id: 413, quantity: '2un', name: 'Ajo' },
        { id: 414, quantity: '1kg', name: 'Harina' },
        { id: 415, quantity: '2un', name: 'Zapallo' },
        { id: 416, quantity: '2kg', name: 'Tallarines' },
        { id: 417, quantity: '1kg', name: 'Arroz' },
        { id: 51, quantity: '10', name: 'Huevos' },
        { id: 52, quantity: '530g', name: 'Pollo' },
        { id: 53, quantity: '1kg', name: 'Cerdo' },
        { id: 54, quantity: '4un', name: 'Yogurt Natural' },
        { id: 55, quantity: '250g', name: 'Mantequilla' },
        { id: 56, quantity: '10un', name: 'Tomates' },
        { id: 57, quantity: '1un', name: 'Lechuga' },
        { id: 58, quantity: '7un', name: 'Paltas' },
        { id: 59, quantity: '100g', name: 'Semillas Chía' },
        { id: 510, quantity: '13un', name: 'Papas' },
        { id: 511, quantity: '4un', name: 'Zanahoria' },
        { id: 512, quantity: '5un', name: 'Cebolla' },
        { id: 513, quantity: '2un', name: 'Ajo' },
        { id: 514, quantity: '1kg', name: 'Harina' },
        { id: 515, quantity: '2un', name: 'Zapallo' },
        { id: 516, quantity: '2kg', name: 'Tallarines' },
        { id: 517, quantity: '1kg', name: 'Arroz' },
    ];
    return (
        <div className="generalContainer flex">
            <SideBar userName={{ Name: "Test", LastName: "User" }} />
            
            <div className="Container relative h-[1100px] grow bg-[#E5E9F0] p-[60px]">
                <h1 className="text-xl font-bold mb-8">Test Page</h1>
                
                {/* Existing test components */}
                <h2>Notification Log Out</h2>
                <text>Ahora el cuadro se ubica arriba a la derecha.</text>
                <NotificationLogOut />
                
                <h2>Welcome PopUp</h2>
                {showWelcome && <WelcomePopUp onSubmitSuccess={handleWelcomeSubmit} />}
                
                <h2>Landing Button</h2>
                <LandingButton bgColor={"#381E72"} textColor={"#D0BCFE"} boxWidth={"200px"} text={"Click Me!"} />
                
                <h2>Recipe Card</h2>
                <RecipeCard boxWidth={"300px"} leftRowInfo={["1", "2"]} rightRowInfo={["3", "4"]} />
                
                <h2>Data Card</h2>
                <DataCard boxWidth={"300px"} leftRowInfo={["1", "2"]} rightRowInfo={["3", "4"]} />
                
                <h2>Pantry Card</h2>
                <PantryCard 
                    boxWidth={340} 
                    leftRowInfo={pantryItems.map((item) => (
                        <span key={`quantity-${item.id}`}>{item.quantity}</span> 
                    ))} 
                    rightRowInfo={pantryItems.map((item) => (
                        <span key={`name-${item.id}`}>{item.name}</span> 
                    ))}
                />
            </div>
        </div>
    );
}