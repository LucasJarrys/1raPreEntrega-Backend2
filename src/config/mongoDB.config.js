import mongoose from "mongoose";
import envs from "./env.config.js";

//FUNCION PARA DETERMINAR LA CONEXION A MONGO ATLAS
// export const connectMongoDB = async () => {
//     try {
//         mongoose.connect(envs.MONGO_URL);
//         console.log("MongoDB connected");
//     } catch (error) {
//         console.log(`Error : ${error}`);
//     }
// }


//ESTA FUNCION QUE SIGUE DEBAJO PUDE LOGRARLA GUIANDOME CON CHAT GPT YA QUE NO PODIA ENCONTRAR EL ERROR QUE ME DABA MONGO DICIENDO QUE TENIA UN CODE DUPLICADO
 
//FUNCION PARA DETERMINAR LA CONEXION A MONGO ATLAS

export const connectMongoDB = async () => {

    try {
        await mongoose.connect(envs.MONGO_URL);
        console.log("Mongo DB connected");
    
    const db = mongoose.connection.db;
    
    //CREAMOS EL NUEVO INDICE CON UN NOMBRE DIFERENTE
    await db.collection('tickets').createIndex(
        { 'products.code': 1 },
        {unique: true, partialFilterExpression: { 'products.code': {$exists: true, $type: 'string'} }, name: "products.code_unique_partial" }
    );
    
} catch (error) {
    console.log(`Error: ${error}`);
    
}
};
