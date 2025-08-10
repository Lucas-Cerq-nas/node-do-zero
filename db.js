
// import postgres from 'postgres'
//console.log(process.env)
// require is not defined in ES module scope, you can use import instead
// import minhaFuncao from './meuModulo.js';

// Importa e executa o método config() do módulo 'dotenv'
// Para usar o método config() diretamente, importe-o.
// import { config } from "dotenv";
// config();

// db.js
// import postgres from 'postgres'
// const sql = postgres({ /* options */ }) // will use psql environment variables
// export default sql

import "dotenv/config";

// Importa o módulo 'http'
import http from "http";

// Importa a função 'neon' do módulo '@neondatabase/serverless'
import { neon } from "@neondatabase/serverless";

// Cria a conexão com o banco de dados 
export const sql = neon(process.env.DATABASE_URL);