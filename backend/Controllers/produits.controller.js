// Importe la connexion à la base SQLite depuis db.js
// ("../" remonte d'un dossier : on sort de controllers/ pour atteindre la racine)
import { db } from "../db.js";

// Fonction exportée : appelée par la route GET /api/produits
// req = requête reçue (inutilisée ici), res = réponse à renvoyer
export function listerProduits(req, res) {
  // Récupère les produits dans la base et les stocke dans la variable "produits"
  const produits = db
    // Prépare la requête SQL : sélectionne id, nom et prix,
    // triés par nom dans l'ordre alphabétique
    .prepare("SELECT id, nom, prix FROM produits ORDER BY nom")
    // .all() exécute la requête et renvoie toutes les lignes
    // sous forme de tableau d'objets : [{ id, nom, prix }, ...]
    .all();
  // Envoie le tableau au client au format JSON (code HTTP 200 par défaut)
  res.json(produits);
}


export default function AjoutProduits (req, res) 
{
  const {nom, prix,quantite} = req.body

  
  

  if(!nom || !prix ||!quantite)
  {
    return res.status(400).json({ message: "Données invalides " })
  }
  
  try {
    db.prepare("INSERT INTO produits (nom, prix, quantite) VALUES (?, ?,?)").run(nom, prix, quantite)
    res.status(201).json({ message: "le produit est ajouté" })
    

  }catch(err){
    console.error(err)
    res.status(500).json({ message: "Erreur serveur" })

  }
}


export  function searchProduit (req, res)
{

  const search = req.query.q || "";

  try {
   const resultat =   db.prepare("SELECT * FROM produits  WHERE nom LIKE '%%' ").all()
   res.json(resultat)

  }catch(err){

    res.status(500).json({message:err.message})
  }

  
}