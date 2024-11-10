import LandingButton from "../components/landingButton"
import RecipeCard from "../components/recipeCard"
import DataCard from "../components/dataCard"
import NotificationLogOut from "../components/notificationLogOut";
import PantryCard from "../components/pantryCard";

export default function TestPage() { 
    // This is a test page to see if the components are working correctly
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
    ];
    return(
        <div>
            <h1 className="text-xl font-bold font-">Test Page</h1>
            <h2>Notification Log Out</h2>
            <text>     Ahora el cuadro se ubica arriba a la derecha.</text>
            <NotificationLogOut />
            <h2>Landing Button</h2>
            <LandingButton bgColor={"#381E72"} textColor={"#D0BCFE"} boxWidth={"200px"} text={"Click Me!"} />
            <h2>Recipe Card</h2>
            <RecipeCard boxWidth={"300px"} leftRowInfo={["1", "2"]} rightRowInfo={["3", "4"]} />
            <h2>Data Card</h2>
            <DataCard boxWidth={"300px"} leftRowInfo={["1", "2"]} rightRowInfo={["3", "4"]} />
            <h2>Pantry Card</h2>
            <PantryCard boxWidth={340} 
              leftRowInfo={pantryItems.map((item) => 
                
                  <span key={`quantity-${item.id}`}>{item.quantity}</span> 
    
              )} 
              rightRowInfo={pantryItems.map((item) => (
                <span key={`name-${item.id}`}>{item.name}</span> 
              ))}/>
        </div>
    );
}