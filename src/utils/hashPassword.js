import bcrypt from "bcrypt";

//HASHEO DE CONTRASEÑA
export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

//VALIDAR LAS CONTRASEÑAS

export const isValidPassword = (userPassword, password) => {
    return bcrypt.compareSync(password, userPassword);
}