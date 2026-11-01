import { useState } from "react";
import Nav from "./Nav";
import { useAuth } from "../Context/AuthContext";
import { Navigate, useNavigate } from "react-router";



function Inscription () 

{
    const navigate = useNavigate();
    const {connecter} = useAuth()
    const [form ,setForm] = useState({nom: "", prenom: "", email: "",password:""})
    
    // État du message d'erreur ("" = pas d'erreur)
    const [erreur, setErreur] = useState("");
    
    // État du succès : false au départ, true quand l'inscription a réussi
    const [succes, setSucces] = useState(false);
    
    
    // Gestionnaire appelé à chaque modification d'un champ
    const handleChange = (e) => {
        // Extrait les propriétés utiles du champ qui a changé (déstructuration)
        const { name, value, type, checked } = e.target;
        // Met à jour l'état avec un nouvel objet (prev = ancien état)
        setForm((prev) => ({
            ...prev,  // recopie tous les champs existants
            // [name] : clé dynamique (nom, email...) ; une checkbox donne "checked", les autres "value"
            [name]: type === "checkbox" ? checked : value,
        }))
        // Affiche le champ modifié dans la console (y compris le mot de passe en clair)
        console.log(e.target.name, e.target.value)
    
    }


    const handleSubmit = async (e) =>{
         e.preventDefault()
        // try/catch : intercepte les erreurs réseau
        try {
            // Envoie la requête au backend et attend la réponse
            const res = await fetch("http://localhost:3000/api/inscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },   // le corps est du JSON
                body: JSON.stringify({
                    nom: form.nom,
                    prenom: form.prenom,
                    email : form.email,
                    password : form.password

                }),
            })

            // Lit le corps de la réponse et le convertit en objet JavaScript
            const data = await res.json();

            // res.ok vaut false pour tout code HTTP hors 200-299 (400, 409, 500...)
            if (!res.ok) {
                // Affiche le message renvoyé par le serveur
                setErreur(data.message);
                // Masque un éventuel message de succès précédent
                setSucces(false);
                // Arrête la fonction ici
                return;
            }

            connecter(form.email, form.password)

            

            // Réponse positive : efface l'erreur et affiche le succès
            setErreur("");
            setSucces(true);
            navigate("/", { replace: true })


            


        } catch {
            // Le serveur n'a pas répondu (backend éteint, proxy Vite absent...)
            setErreur("Serveur injoignable. Vérifie que le backend est lancé.");
            setSucces(false);
        }
        

    }







    return(
        <>
            <div className="p-5  md:px-[15%]">
                <Nav />
                <div className="font-[Arial,sans-serif] m-0 p-0 flex justify-center items-center h-screen">
                    <div className= "bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[300px]">

                        <h2 className="text-center text-[#1f3a5f] text-2xl ">Formulaire d'Inscription</h2>

                        <form onSubmit={handleSubmit}>

                            <label htmlFor="nom" className="text-[#000000]" >Entrez le Nom</label>
                            <input type="text" name="nom" id="nom" value={form.nom} onChange={handleChange} className="w-full p-[10px] text-[#000000] my-2 box-border border border-[#ccc] rounded"/>

                            <label htmlFor="prenom" className="text-[#000000]" >Entrez votre Prenom</label>
                            <input type="text" name="prenom" id="prenom" value={form.prenom} onChange={handleChange} className="w-full p-[10px] text-[#000000] my-2 box-border border border-[#ccc] rounded" />

                            <label htmlFor="email" className="text-[#000000]" >Entrez votre E-mail</label>
                            <input type="email" name="email" id="email"  value={form.email} onChange={handleChange} className="w-full p-[10px]  text-[#000000] my-2 box-border border border-[#ccc] rounded" />

                            <label htmlFor="password" className="text-[#000000]" >Entrez votre Mot de Passe</label>
                            <input type="password" name="password" id="password" value={form.password}  onChange={handleChange}   className="w-full p-[10px] text-[#000000] my-2 box-border border border-[#ccc] rounded"/>

                            {/* Affiche le paragraphe d'erreur seulement si erreur n'est pas vide */}
                            {erreur && <p className="text-[#000000]">{erreur}</p>}

                            {/* Affiche le message de succès seulement si succes vaut true */}
                            {succes && <p className="text-[#000000]">{succes}</p>}

                            <input type="submit" value="S'inscrire"  className="w-full bg-[#1f3a5f] text-white py-[10px] border-0 rounded cursor-pointer hover:bg-black hover:text-white"/>

                        </form>
                    </div>
                </div>

            </div>
        
        </>
    )
    

}

export default Inscription