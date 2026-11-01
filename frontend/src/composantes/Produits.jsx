
import { useState } from "react"


function Produits () 
{
    const [form, setForm] = useState({nom: "", prix: 0, quantite: 0})
    

    const [erreur, setErreur] = useState("")
    const [succes, setSucces] = useState(false)

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }))
        console.log(e.target.name, e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await fetch(" http://localhost:3000/api/produits/ajoutProduit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nom : form.nom,
                    prix : form.prix,
                    quantite: form.quantite

                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setErreur(data.message);
                setSucces(false);
                return;
            }

            setErreur("");
            setSucces(true);
            setForm({nom: "", prix: 0, quantite: 0})

        }catch {

            setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
            setSucces(false);

        }
    }






    return(


        <>

        <div className="font-[Arial,sans-serif] m-0 p-0 flex justify-center items-center h-screen">
            <div className= " bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[300px]" >
                <h2 className="text-center text-[#1f3a5f] text-2xl "> Ajouter un produit</h2>

                <form onSubmit={handleSubmit}  >
                    <label htmlFor="nom" className="text-[#000000]" >Nom du Produit</label>
                    <input type="text" name="nom" id="nom"  value={form.nom} onChange={handleChange} className="w-full p-[10px] my-2 text-[#000000] box-border border border-[#ccc] rounded"/>

                    <label htmlFor="prenom" className="text-[#000000]"  >prix</label>
                    <input type="number" name="prix" id="prix"  value={form.prix} onChange={handleChange} className="w-full p-[10px] my-2 text-[#000000] box-border border border-[#ccc] rounded"/>

                    <label htmlFor="prenom" className="text-[#000000]"  >Quantité</label>
                    <input type="number" name="quantite" id="quantite"  value={form.quantite} onChange={handleChange} className="w-full p-[10px] my-2 text-[#000000] box-border border border-[#ccc] rounded"/>

                    {/* Affiche le paragraphe d'erreur seulement si erreur n'est pas vide */}
                    {erreur && <p>{erreur}</p>}

                    {/* Affiche le message de succès seulement si succes vaut true */}
                    {succes && <p>{succes}</p>}

                    <input type="submit" value="Ajouter" className="w-full bg-[#1f3a5f] text-white py-[10px] border-0 rounded cursor-pointer hover:bg-black hover:text-white" />

                    

                </form>
            </div>
        </div>
        </>
    )

}

export default Produits