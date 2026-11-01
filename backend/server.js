// Importe Express (framework web pour Node.js)
import express from "express";
// Importe le routeur d'authentification (routes /inscription et /connexion)
// "default" : pas d'accolades, le nom authRoutes est choisi librement
import authRoutes from "./Routes/authRoutes.js";
// Importe le routeur des produits (route GET /)
import produitsRoutes from "./Routes/produits.route.js";

import cors from 'cors'

// Crée l'application Express : l'objet qui représente ton serveur
const app = express();
app.use(cors());
// Middleware global : lit le JSON des requêtes et le place dans req.body
app.use(express.json()); // lit le JSON envoyé par React

// Monte le routeur d'authentification sous le préfixe "/api"
// Ses routes deviennent donc /api/inscription et /api/connexion
app.use("/api", authRoutes);                  // /api/inscription, /api/connexion
// Monte le routeur des produits sous le préfixe "/api/produits"
// Sa route "/" devient donc /api/produits
app.use("/api/produits", produitsRoutes);     // /api/produits

// Démarre le serveur sur le port 3000
// La fonction fléchée s'exécute une fois le serveur prêt et affiche un message
app.listen(3000, () => console.log("API démarrée sur http://localhost:3000"));