# recipe-search-service
This is a simple recipe search service that takes a list of ingredients and returns a list of recipes.

# Response Schema

```
{
    count : number,
    recipes : [
        {
            name : string,
            source : string,
            link : string,
            ingredients : [
                {
                    text : string,
                    quantity : number,
                    measure : string,
                    food : string,
                    weight : number,
                    foodCategory : string,
                    foodId : string,
                    image : string
                }
            ]
        }
    ]
}


```

# request

```
const data = await fetch("https://<domain>/?ingredients=<comma separated list of ingredients>", { method : GET });
```