import Replicate from "replicate";

if (!process.env.REPLICATE_API_TOKEN) {
  console.warn("REPLICATE_API_TOKEN mangler i miljøvariabler. Designgenerering vil ikke fungere.");
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN ?? "",
});

export { replicate };
