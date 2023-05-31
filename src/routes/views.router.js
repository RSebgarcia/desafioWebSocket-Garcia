import {Router} from 'express';
import path from 'path'
import __dirname from '../utils.js';
import fs from 'fs'

const router = Router();


router.get("/", (req, res) => {
    const productsFilePath = path.join(__dirname, "public/storage/products.json");

    try {
        const productsData = fs.readFileSync(productsFilePath, "utf-8");
        const products = JSON.parse(productsData);
        res.render("home", { products });
    } catch (error) {
        console.error("Error reading products file:", error);
        res.status(500).send("Failed to retrieve products");
    }
});
export default router;