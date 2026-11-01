

import Home from "./composantes/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inscription from "./composantes/Inscription"
import Produits from "./composantes/Produits"


import Cart from "./composantes/Panier"
import Login from "./composantes/Login"
import AuthProvide from "./Context/AuthContext"
import PanierProvider from "./Context/PanierContext"






function App() {
  

  return (
    <>
    

      <BrowserRouter>
        <AuthProvide >
         
            <Routes>
              <Route path="/"  element={<Home />} />
              <Route path="/inscription"  element={<Inscription />} />
              <Route path="/connexion"  element={<Login />} />
              <Route path="/ajoutProduits"  element={<Produits />} />
              
              <Route path="/panier"  element={<Cart />} />
              
              <Route path= "*" element = {<Home />} />
            </Routes>

          {/* NB: je n'ai pas finalisé le panier mon projet prend en compte les éléments suivants:  */}
          {/* la barre de recherche, l'affichage du catalogue, l'authentification de l'utilisateur */}
          {/*et l'ajout d'un produit dans le base de donnée */}
          

        </AuthProvide>
        
      </BrowserRouter>
      
      

  
    
    
    </>
  )
}

export default App
