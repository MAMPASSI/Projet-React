
import photo from "../img/play.jpg"
import Recherche from "./Recherche"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";




function Catalogue ()
{

    const [produits, setProduits] = useState([])
    const [search , setSearch]  = useState("")
    console.log("[rendu] Catalogue, recherche =", search);
    
    const  produitsFiltres = produits.filter((p) => p.nom.toLowerCase().includes(search.toLowerCase()))


    



    
    

    const [loading, setLoading] = useState(true)

    const [error, setError] = useState("")


    useEffect(() => {
        const fetchProduit = async () => {
            try {
                const reponse  = await fetch("http://localhost:3000/api/produits")

                if (!reponse.ok) {
                    throw new Error("Erreur lors du chargement des produits");
                }

                const data = await reponse.json();

                setProduits(data)




            }catch (err) {

                setError("Serveur injoignable. Vérifie que le backend est lancé.")

            }finally {
                setLoading(false)
            }

        }
        fetchProduit()
    },[])




    return (
        <>

        <div className="mt-10">
            <Recherche valeur={search} onChange={setSearch} />
                
            <div className="grid md:grid-cols-3 gap-4">
                {/* {
                    resultat.length>0 && resultat.map( (produit) =>(
                        <div  key={produit.id} className="bg-base-300 p-5 h-fit rounded-xl shadow-lg">
                            <img src={photo} alt= "photo"
                                className="w-full rounded-xl h-56 object-cover"  
                            />

                            <div>
                                <h1 className="my-2 font-bold ">
                                    {produit.nom}
                                </h1>
                                <p className="text-1xl  mb-2">
                                    
                                    {produit.prix}£
                                </p>
                            </div>

                        

                            <div className="flex ">
                                <a className ="btn btn-accent w-2/3" href="#">
                                    Ajouter au panier
                                    
                                </a>

                                
                            </div>

                        </div>

                    ))
                } */}
                {
                    produitsFiltres.map( (produit) => (
                        
                        <div  key={produit.id} className="bg-base-300 p-5 h-fit rounded-xl shadow-lg">
                            <img src={photo} alt= "photo"
                                className="w-full rounded-xl h-56 object-cover"  
                            />

                            <div>
                                <h1 className="my-2 font-bold ">
                                    {produit.nom}
                                </h1>
                                <p className="text-1xl  mb-2">
                                    
                                    {produit.prix}£
                                </p>
                            </div>

                        

                            <div className="flex ">
                                <a className ="btn btn-accent w-2/3" href="#">
                                    Ajouter au panier
                                    
                                </a>

                                
                            </div>

                        </div>
                    ))
                }

                     
                

                
                    
                    
            </div>

            
        </div>
        
        </>
    )
}

export default Catalogue