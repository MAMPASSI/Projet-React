import { useState } from "react";

let tab = [];



(async function getProduits(){
    try {
        const reponse = await fetch('http://localhost:3000/api/produits');
        const produits = await reponse.json(); // Conversion de la réponse en format JSON
        
        const newTab = [...produits, ...tab];

        tab = newTab;

        console.log("Produits récupérés :", tab);
      } catch (erreur) {
        console.error("Erreur lors de la récupération :", erreur);
      }

})()