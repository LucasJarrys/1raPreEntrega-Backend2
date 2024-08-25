import { ticketModel } from "./models/ticket.model.js";

//OBTENER TODOS LOS ticket
const getAll = async (query, options) => {
    const tickets = await ticketModel.paginate(query, options);
    return tickets;
};

//CONSEGUIMOS ticket POR ID
const getById = async (id) => {
    const ticket = await ticketModel.findById(id);
    return ticket;
};

// FUNCION PARA CREAR ticket
const create = async (data) => {
    const ticket = await ticketModel.create(data);
    return ticket;
};


// ACTUALIZAMOS ticket
const update = async (id, data) => {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, {new: true});
    // const ticketUpdate = await ticketModel.find(id);
    return ticketUpdate;
};

// ELIMINAMOS ticket POR SU ID
const deleteOne = async (id) => {
    const ticket = await ticketModel.findByIdAndUpdate(id, {status: false}, {new: true});
    return ticket;
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}