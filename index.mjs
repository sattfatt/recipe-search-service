import express, { query, response } from "express";
import cors from "cors";
import fetch from "node-fetch";

const port = process.env.PORT || 3001;
const app = express();

const app_id = "4d410f16";
const app_key = "52ece7429f1aab17b37dc5abc9bf1ecb";

const api_endpoint = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${app_id}&app_key=${app_key}&q=`;


app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));


const getData = async (queries) => {

    let query = "";
    for (const q of queries) {
        query += q + ",";
    }

    const data = await fetch(api_endpoint + query, { method: 'GET' });
    const jsondata = await data.json();
    return jsondata;
}


app.get("/", (req, res) => {
    getData(req.query.ingredients.split(",")).then((data) => {

        console.log(data);

        let filtered = {};

        const count = data.to - data.from + 1;

        filtered["count"] = count;
        filtered["recipes"] = [];

        for (let i = 0; i < count; i++) {
            filtered.recipes.push({
                "name" : data.hits[i].recipe.label,
                "source" : data.hits[i].recipe.source,
                "link" : data.hits[i].recipe.url,
                "ingredients" : data.hits[i].recipe.ingredients,
                "ingredientLines" : data.hits[i].recipe.ingredientLines
            })
        }

        res.send(filtered);
    })
});

app.listen(port, () => {
    console.log("Recipe Search Service running on port ", + port);
})

