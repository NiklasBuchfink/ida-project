const fs = require('fs');
    
export default async function handler (req, res) {
  const example = await fs.readFile('./lib/data/niklasData.json');
  console.log(example[0]);
  return res.status(200).json({example});
}