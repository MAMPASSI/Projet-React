import { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../Context/AuthContext";



import Nav from "./Nav"



function Login ()

{

    
    
    const { connecter, estConnecte } = useAuth();
    const navigate = useNavigate();
    const [login, setLogin] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [erreur, setErreur] = useState("");



    const loginRef = useRef(null);

    useEffect(() => {
        loginRef.current?.focus();
    }, []);

    


    const handleSubmit = (e) => {
        e.preventDefault();
        const ok = connecter(login.trim(), motDePasse);
        if (ok) {
        navigate("/", { replace: true });
        } else {
                setErreur("Login ou mot de passe incorrect");
                setMotDePasse("");
            }
    };

    if (estConnecte) {
        return <Navigate to="/" replace />;
    }



    return (
        <>

        <div className="p-5  md:px-[15%]">
            <Nav />
            <div className="font-[Arial,sans-serif] m-0 p-0 flex justify-center items-center h-screen">
                <div className= "bg-white p-5 rounded-[10px] shadow-[0_0_10px_rgba(0,0,0,0.1)] w-[300px]">

                    <h2 className="text-center text-[#1f3a5f] text-2xl ">Formulaire d'Inscription</h2>

                    <form onSubmit={handleSubmit}>

                            
                        <label htmlFor="email" className="text-[#000000]" >Entrez votre E-mail</label>
                        <input type="text" ref={loginRef} value={login} onChange={(e) => setLogin(e.target.value)} autoComplete="username" className="w-full p-[10px]  text-[#000000] my-2 box-border border border-[#ccc] rounded"  />

                        <label htmlFor="password" className="text-[#000000]" >Entrez votre Mot de Passe</label>
                        <input type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value) }  autoComplete="current-password"  className="w-full p-[10px] text-[#000000] my-2 box-border border border-[#ccc] rounded"/>

                            {/* Affiche le paragraphe d'erreur seulement si erreur n'est pas vide */}
                            {/* {erreur && <p className="text-[#000000]">{erreur}</p>} */}

                            {/* Affiche le message de succès seulement si succes vaut true */}
                            {/* {succes && <p className="text-[#000000]">{succes}</p>} */}

                        <input type="submit" value="S'inscrire"  className="w-full bg-[#1f3a5f] text-white py-[10px] border-0 rounded cursor-pointer hover:bg-black hover:text-white"/>

                    </form>
                </div>
            </div>

            </div>
        </>
    )

}

export default Login