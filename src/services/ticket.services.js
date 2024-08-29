import ticketRepository from "../persistence/mongoDB/ticket.repository.js";

const createTicket = async (userEmail, totalCart) => {
    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: Math.random().toString(36).substr(2, 9),
    };
    
    
    const ticket = await ticketRepository.create(newTicket);
    return ticket;
};

// const eliminateTicket = async (id) => { //NO SE ELIMINABA EL TICKET Y PROBE CON UNA FUNCION 
//     ticketRepository.deleteOne(id)
// };

export default {
    createTicket,
};