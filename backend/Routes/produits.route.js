import { Router } from "express";
import AjoutProduits, { listerProduits } from "../Controllers/produits.controller.js";
import {searchProduit} from "../Controllers/produits.controller.js"

const router = Router();

router.get("/", listerProduits);
router.get("/search", searchProduit);
router.post("/ajoutProduit", AjoutProduits) 

export default router;