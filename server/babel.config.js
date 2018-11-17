module.exports = function(api) {
   const presets = [
     [
       "@babel/env",
       {
         targets: {
           node: "current"
         },
         useBuiltIns: "usage"
       }
     ]
   ];
   const plugins = [
      "@babel/plugin-proposal-class-properties"
   ];
 
   api.cache(true);
   return {
     presets,
     plugins
   };
 };