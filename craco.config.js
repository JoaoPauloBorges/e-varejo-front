const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { 
              '@primary-color': '#6beb34',
              '@border-radius-base': '8px',
              '@layout-header-height': '50px'
           },
            javascriptEnabled: true,
          },
        },
      }
    }
  ],
};