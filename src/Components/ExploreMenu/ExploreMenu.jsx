import {menu_list} from "../../assets/frontend_assets/assets"
import { motion } from "framer-motion";
const ExploreMenu = ({category,SetCategory}) => {
    console.log(menu_list);
    return (
        <div className="border-b-2 border-orange-500 pb-10 " id="menu">
            <div className="mt-8">
            <h2 className="text-center text-2xl text-orange-500 font-bold pb-20 pt-10">Our Food list</h2>
            <div className="flex flex-wrap justify-evenly">
                {menu_list.map((menu,index)=>{
                    return <div key={index} onClick={()=>SetCategory(menu.menu_name)} className="flex flex-col justify-center gap-y-4">
                        <h2 className="text-center">{menu.menu_name}</h2>
                        <motion.img src={menu.menu_image}
                        whileHover={{ scale: 1.15 }} // Hover effect
                        transition={{ duration: 0.3 }} // Animation duration
                        alt=""  className={category==menu.menu_name?"border-orange-500 border-4 rounded-full":"hover:border-orange-500 border-4 rounded-full"} />
                    </div>
                })}
            </div>
            </div>
            
        </div>
    );
};

export default ExploreMenu;