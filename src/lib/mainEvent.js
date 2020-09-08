import EventBus from "./utils/eventBus";
import store from "./store";

export default new EventBus(store);
