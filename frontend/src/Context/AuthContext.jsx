import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";


const AuthContext = createContext(null)

// const Users = [
//     { login: "alice", motDePasse: "react123", nom: "Alice" },
//     { login: "bob", motDePasse: "hooks456", nom: "Bob" },
// ]




function AuthProvide ({children})
{
    const [utilisateur, setUtilisateur] = useState(null);
    const [chargement, setChargement] = useState(true);

    //verifié si un utilisateur est déjà connecter

    // useEffect(() => {
    //     const verifierUser = async () =>{
    //         try{

    //             const token = localStorage.getItem("token")
    //             if(!token){
    //                 setUtilisateur(null)
    //                 return;
    //             }
    //             const reponse = await fetch("http://localhost:3000/api/connexion")

    //         }catch{

    //         }
    //     }
    // }, [])


    const handleSubmit = async (email, password) => {
       

        try{

            const res = await fetch("http://localhost:3000/api/connexion",{
                method: "POST",
                headers: { "Content-Type": "application/json" },   // le corps est du JSON
                body: JSON.stringify({
                    email : email,
                    password : password
            })})


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

            
           setUtilisateur({id:data.id, login:data.prenom})


        }catch{

        }
    }



    const connecter = useCallback((login, motDePasse) => {
        // const trouve = Users.find((u) => u.login === login && u.motDePasse === motDePasse)

        // if(!trouve) return false
        // setUtilisateur({login: trouve.login, motDePasse: trouve.motDePasse})

        
        handleSubmit(login, motDePasse)

        
        
        
    }, [])

    const deconnecter = useCallback(() => {
        setUtilisateur(null);
        console.log("a")
    }, []);

    const value = useMemo(() => {
        console.log("[useMemo] value du contexte recalculée");
        return {
            utilisateur,
            estConnecte: utilisateur !== null,
            chargement,
            connecter,
            deconnecter,
        }

    }, [utilisateur, chargement, connecter, deconnecter])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth doit être utilisé à l'intérieur de <AuthProvider>");
    }
    return ctx;
}


export default AuthProvide