
export const connectSportmonksApiV2 = () => {
  const apiV2Path = process.env.API_V2_PATH;
  const apiKey = process.env.API_KEY;

  return {
    apiV2Path,
    apiKey,
  };
};
