import { useEffect } from "react"




function Recherche ({valeur, onChange}) 

{

  

    
    return (
        <>
        
        <div className="w-full my-15  p-5 rounded-2x1">
            
                <input type="text" value={valeur}  className="input w-2/3 mr-15" placeholder="Entrez le nom d'un produit..." onChange={(e) => onChange(e.target.value)} />
                
            
        </div>
        </>
    )

}

export default Recherche