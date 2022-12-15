const { NODE_ENV } = process.env;

/* variables added to this export will be available in
config.service.ts through configService.get<string>("VARIABLE_NAME")
*/
export default () => {
  return {
    NODE_ENV,
  };
};
