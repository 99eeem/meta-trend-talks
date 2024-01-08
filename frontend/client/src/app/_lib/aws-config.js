const awsconfig = {
    API: {
      REST: {
        [process.env.NEXT_PUBLIC_API_NAME]: {
          endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT,
          region: process.env.NEXT_PUBLIC_REGION,
        },
      },
    },
  };
  
  export default awsconfig;