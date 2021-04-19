import EventEmitter from "eventemitter3";

let currentEventEmitter: EventEmitter;

const getEventEmitter = () => {
	if (!currentEventEmitter) {
		currentEventEmitter = new EventEmitter();
	}
	return currentEventEmitter;
};

export default getEventEmitter();
