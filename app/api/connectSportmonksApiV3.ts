
export const connectSportmonksApiV3 = () => {
  const apiV3Path = process.env.API_V3_PATH;
  const apiKey = process.env.API_KEY;

  return {
    apiV3Path,
    apiKey,
  };
};
