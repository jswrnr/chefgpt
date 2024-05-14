import express from "express";
import { GPT_KEY } from "../../config.js";
import { pool } from "../../index.js";
import fetch from "node-fetch";

const router = express.Router();

// receive an image and create items based on the response by gpt
router.post("/recognizeProducts", async (req, res) => {
  // the image needs to be sent as a base64 string
  const { image, date } = req.body;
  const prompt = `As the Image Recognition Assistant, you are tasked with analyzing images uploaded by users to identify products and their quantities, providing responses exclusively in JSON format. When you are provided with an image,  your role is to recognize all the items on the image and  list each product with its corresponding quantity and unit, such as '{"bottles of milk": "2", "apples": "6", "bag of potatoes": "1"}'. Remember, your responses should only be in JSON format, without additional commentary or instructions. This streamlined approach is designed for a webapp where users expect automatic, concise, and informative product identification from their uploaded images.'`;
  const messages = [
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${image}`,
          },
        },
      ],
    },
  ];
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GPT_KEY}`,
  };
  const payload = {
    model: "gpt-4-vision-preview",
    messages: messages,
    max_tokens: 3000,
    temperature: 0.1,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Error when communicating with gpt:", error);
  });

  const json_response = await response.json();
  console.log("REPONSE JSON: " + JSON.stringify(json_response));
  if (!response.ok) {
    console.error("Error when communicating with gpt:", json_response);
    return res.status(500).json({ message: "Error when communicating with gpt" });
  } else {
    let itemsString = json_response.choices[0].message.content;
    itemsString = itemsString.replace(/`/g, ''); // Remove backticks
    itemsString = itemsString.replace(/\n/g, ''); // Remove newline characters
    itemsString = itemsString.replace(/  /g, ''); // Remove extra spaces
    itemsString = itemsString.replace('json', ''); // Replace single quotes with double quotes
    const items = JSON.parse(itemsString); // Parse JSON string
    console.log("ITEMS: " + JSON.stringify(items));
    const queryText = "INSERT INTO items (name, count, date) VALUES ($1, $2, $3)";

    for (let itemName in items) {
      try {
        const itemCount = items[itemName];
        await pool.query(queryText, [itemName, itemCount, date]);
      } catch (error) {
        console.log("ERROR: " + error.message + "\n No products were added.");
      }
    }
  }
  return res.status(201).json({ message: "Items created successfully" });
});


// receive an image and create items based on the response by gpt
router.post("/recognizeReceipt", async (req, res) => {
  // the image needs to be sent as a base64 string
  const { image, date } = req.body;
  const prompt = `As the Image Recognition Assistant, you are tasked with analyzing images of receipts uploaded by users to identify the listed products and their quantities, providing responses exclusively in JSON format. When you are provided with an image,  your role is to recognize all the items on the receipt and list each product with its corresponding quantity and unit, such as '{"bottles of milk": "2", "apples": "6", "bag of potatoes": "1"}'. Remember, your responses should only be in JSON format, in English, without additional commentary or instructions. If the items on the receipt are in a language other than English than translate it into English. If the item is not a food item than do NOT include it into your response. For instance a paper bag is not a food item and is therefore not wanted in your response. This streamlined approach is designed for a webapp where users expect automatic, concise, and informative product identification from their uploaded images.'`;
  const messages = [
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${image}`,
          },
        },
      ],
    },
  ];
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GPT_KEY}`,
  };
  const payload = {
    model: "gpt-4-vision-preview",
    messages: messages,
    max_tokens: 3000,
    temperature: 0.1,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  }).catch((error) => {
    console.error("Error when communicating with gpt:", error);
  });

  const json_response = await response.json();
  console.log("REPONSE JSON: " + JSON.stringify(json_response));
  if (!response.ok) {
    console.error("Error when communicating with gpt:", json_response);
    return res.status(500).json({ message: "Error when communicating with gpt" });
  } else {
    let itemsString = json_response.choices[0].message.content;
    itemsString = itemsString.replace(/`/g, ''); // Remove backticks
    itemsString = itemsString.replace(/\n/g, ''); // Remove newline characters
    itemsString = itemsString.replace(/  /g, ''); // Remove extra spaces
    itemsString = itemsString.replace('json', ''); // Replace single quotes with double quotes
    const items = JSON.parse(itemsString); // Parse JSON string
    console.log("ITEMS: " + JSON.stringify(items));
    const queryText = "INSERT INTO items (name, count, date) VALUES ($1, $2, $3)";

    for (let itemName in items) {
      try {
        const itemCount = items[itemName];
        await pool.query(queryText, [itemName, itemCount, date]);
      } catch (error) {
        console.log("ERROR: " + error.message + "\n No products were added.");
      }
    }
  }
  return res.status(201).json({ message: "Items created successfully" });
});

router.post("/getRecipes", async (req, res) => {
  try {
    const { products } = req.body;
    const { generationOptions } = req.body;
    console.log("PRODUCTS: " + JSON.stringify(products));

    const recipePrompt = `Generate a recipe for the following ingredients: ${products.map(product => product.name).join(", ")}. Make sure that the recipe meets the following conditions: ${generationOptions}.
Example Continuation:
Provide the recipe in the following JSON format:
{ "recipe": { "id": 1, "name": "Lemon Garlic Chicken Quinoa Bowl", "description": "A healthy and flavorful bowl featuring grilled chicken, quinoa, and fresh vegetables.", "ingredients": [ { "name": "Chicken breast", "quantity": "2 boneless, skinless breasts" }, { "name": "Quinoa", "quantity": "1 cup" }, { "name": "Broccoli", "quantity": "1 head, chopped" }, { "name": "Cherry tomatoes", "quantity": "1 cup, halved" }, { "name": "Olive oil", "quantity": "3 tablespoons" }, { "name": "Garlic", "quantity": "3 cloves, minced" }, { "name": "Lemon", "quantity": "1, juiced" }, { "name": "Salt", "quantity": "to taste" }, { "name": "Black pepper", "quantity": "to taste" } ], "instructions": [ "Cook quinoa according to package instructions.", "Season chicken with salt and black pepper, grill until fully cooked.", "In a pan, sauté garlic in olive oil until fragrant.", "Add chopped broccoli and cook until slightly tender.", "Mix in cherry tomatoes, cooked quinoa, and grilled chicken slices.", "Drizzle with lemon juice, toss everything together.", "Season with additional salt and black pepper to taste.", "Serve the Lemon Garlic Chicken Quinoa Bowl and enjoy!" ], "prep_time": "20 minutes", "cook_time": "20 minutes", "total_time": "40 minutes", "servings": 4, "difficulty": "Easy", "nutrition_info": { "calories": 350, "protein": 30, "carbohydrates": 40, "fat": 10, "fiber": 8 } } }
You are a culinary expert GPT that first suggests possible recipes by name based on a JSON list of ingredients provided by the user. It generates ideas like 'Spaghetti with Tomato Sauce' or 'Spaghetti with Mushroom Cream Sauce' when given ingredients such as spaghetti, tomatoes, mushrooms, and cream. Once the user selects a preferred recipe, you then provide a detailed, step-by-step guide on how to cook it. The recipes exclusively use the provided ingredients, with the allowance for spices, salt, and water. Chef Bot focuses on culinary creativity, offering multiple recipe options and clear cooking instructions, ensuring an engaging and helpful cooking experience.
`;

    const messages = [
      {
        role: "user",
        content: [
          { type: "text", text: recipePrompt },
        ],
      },
    ];

    const options = {
      model: "gpt-4",
      messages: messages,
      max_tokens: 3000,
      temperature: 0.1,
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GPT_KEY}`,
      },
      body: JSON.stringify(options),
    });

    const responseData = await response.json();

    const recipe = JSON.parse(responseData.choices[0].message.content).recipe;
    console.log("RECIPE: " + JSON.stringify(recipe));
  
    return res.status(200).json(recipe);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


export { router as gptRouter };
