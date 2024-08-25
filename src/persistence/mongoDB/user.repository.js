import { userModel } from "./models/user.model.js";

//OBTENER TODOS LOS USUARIOS
const getAll = async (query, options) => {
    const users = await userModel.paginate(query, options);
    return users;
};

//CONSEGUIMOS USUARIOS POR ID
const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
};

//CONSEGUIMOS USUARIO POR EMAIL
const getByEmail = async (email) => {
    const user = await userModel.findOne({email: email});
    return user;
};

// FUNCION PARA CREAR USUARIOS
const create = async (data) => {
    const user = await userModel.create(data);
    return user;
};


// ACTUALIZAMOS USUARIOS
const update = async (id, data) => {
    const userUpdate = await userModel.findByIdAndUpdate(id, data, {new: true});
    return userUpdate;
};

// ELIMINAMOS userO POR SU ID
const deleteOne = async (id) => {
    const user = await userModel.findByIdAndUpdate(id, {status: false}, {new: true});
    return user;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
    getByEmail
}