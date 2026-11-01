import { Container } from "lucide-react";

import { NavLink } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";


function Nav ()
{
    const { estConnecte, utilisateur ,deconnecter} = useAuth();

    console.log(estConnecte)
    console.log(utilisateur);
    

    return (
        <>
        <div className="flex  justify-center md:justify-between iteams-center p-4">
            <a href="#" className="flex iteams-center font-bold text-3xl md:text-xl">
            <Container /> 
                Ma <span className="text-accent">Boutique</span>
            </a>

            <ul className="hidden md:flex space-x-7">
                <NavLink  to="/" >
                    <li className="btn btn-sm btn-ghost">
                        Catalogue
                    </li>
                </NavLink>

                {utilisateur == null && <NavLink  to="/inscription" >
                    <li className="btn btn-sm btn-ghost">
                        inscription 
                    </li>
                </NavLink>}

                

                {
                   !estConnecte && utilisateur  == null ? <NavLink  to="/connexion" >
                    <li className="btn btn-sm btn-ghost">
                        se connecter
                    </li>
                    
                </NavLink> 
                
                : <NavLink  to="#" >
                    <li className="btn btn-sm btn-ghost" onClick={deconnecter}>
                        se deconnecter
                    </li>
                 </NavLink>
                    
                }

                {utilisateur  !==  null && <p className="text-accent font-bold">Bonjour {utilisateur.login}</p>}

                {/* <NavLink  to="/connexion" >
                    <li className="btn btn-sm btn-ghost">
                        se connecter
                    </li>
                </NavLink>

                <NavLink  to="#" >
                    <li className="btn btn-sm btn-ghost">
                        se deconnecter
                    </li>
                </NavLink> */}

                <NavLink  to="/panier" >
                    <li className="btn btn-sm btn-ghost">
                        Panier
                    </li>
                </NavLink>

                

                

                
                

            </ul>
            
        </div>
        </>
    )
}

export default Nav