import dotenv from 'dotenv';

dotenv.config();

const config = {
  url: process.env.URL,
  port: process.env.PORT
};

export default config;