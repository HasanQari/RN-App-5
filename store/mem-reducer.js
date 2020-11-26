import { ADD_MEM, SET_MEM } from "./mem-action";
import Memories from '../models/mem';

const initState = {
    memories: [],
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_MEM:
            return {
                memories: action.mem.map(
                    m => new Memories(
                        m.id.toString(),
                        m.title,
                        m.imageUri,
                        m.address,
                        m.lat,
                        m.lng
                    ))
            };
        case ADD_MEM:
            const newMem = new Memories(
                action.MemData.id.toString(),
                action.MemData.title,
                action.MemData.image,
                action.MemData.address,
                action.MemData.lat,
                action.MemData.lng,
            );
            return {
                memories: state.memories.concat(newMem)
            }
        default:
            return state;
    }
}