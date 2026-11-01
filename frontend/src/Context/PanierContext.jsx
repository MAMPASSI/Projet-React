import { Children, createContext, use, useCallback, useContext, useState } from "react"

const PanierContext = createContext(null)
const QUANTITE_MAX =10

function PanierProvider ({Children})
{
    const [lignes, setLignes] = useState([])
    const value = {lignes, ajoutProduit}
    console.log("[rendu] PanierProvider, lignes =", lignes);

    const ajoutProduit = useCallback((produit) => {
        console.log("[panier] ajouter :", produit.nom);

        setLignes((prev) => {
            const existante = prev.find((iteam) => iteam.id === produit.id)

            if(!existante)
            {
                return[
                    ...prev,
                    {id:produit.id, nom:produit.nom, prix:produit.prix,quantite:1}
                ]
            }

            if(existante.quantite >= QUANTITE_MAX) return prev

            return prev.map( (l) => l.id === produit.id ? {...l,quantite: l.quantite +1} : l)
            
           
        })

    },[])

    return <PanierContext.Provider value={value}>{Children}</PanierContext.Provider>


}


export function usePanier()
{
    const ctx = useContext(PanierContext)
    if(!ctx)
    {
        throw new Error("usePanier doit être utilisé à l'intérieur de <PanierProvider>");
    }

    return ctx
}


export default PanierProvider