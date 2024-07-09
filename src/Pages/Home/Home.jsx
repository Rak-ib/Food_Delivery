import { useState } from "react";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import Header from "../../Components/Header/Header";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";


const Home = () => {
    const [category,SetCategory]=useState("All");
    return (
        <div className="container mx-auto pt-4">
            <Header></Header>
            <ExploreMenu category={category} SetCategory={SetCategory}></ExploreMenu>
            <FoodDisplay category={category}></FoodDisplay>
        </div>
    );
};

export default Home;