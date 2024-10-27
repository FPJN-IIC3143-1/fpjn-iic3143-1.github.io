import LandingButton from "../components/landingButton"
import RecipeCard from "../components/recipeCard"
import DataCard from "../components/dataCard"
import NotificationLogOut from "../components/notificationLogOut";

export default function TestPage() { 
    // This is a test page to see if the components are working correctly
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
        </div>
    );
}