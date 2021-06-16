const fs = require("fs");

export const fileExisits = async (filePath: string) => {
  const response = await fs.existsSync(filePath);
  return response;
};
