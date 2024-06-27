"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAPage = exports.isAGuest = exports.resetTranscriptsForTesting = exports.load_page = exports.save_page = exports.load_guest = exports.save_guest = exports.add_guest = void 0;
let array = new Array;
let savedPage = 'list';
/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
const add_guest = (req, res) => {
    const guest = req.body.guest;
    if (guest === undefined) {
        res.status(400).send('required argument "guest" was missing');
        return;
    }
    if (guest === null) {
        res.status(400).send('guest was null');
        return;
    }
    if (!(0, exports.isAGuest)(guest)) {
        res.status(400).send('value sent is not a guest');
        return;
    }
    array.push(guest);
    res.status(200).send({ saved: true });
};
exports.add_guest = add_guest;
/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
const save_guest = (req, res) => {
    const guest = req.body.guest;
    if (guest === undefined) {
        res.status(400).send('required argument "guest" was missing');
        return;
    }
    if (guest === null) {
        res.status(400).send('guest was null');
        return;
    }
    const index = req.body.index;
    if (index === undefined) {
        res.status(400).send('required argument "index" was missing');
        return;
    }
    if (typeof index !== 'number') {
        res.status(400).send('not number');
        return;
    }
    if (!(0, exports.isAGuest)(guest)) {
        res.status(400).send('value sent is not a guest');
        return;
    }
    if (index >= array.length) {
        res.status(400).send('index is out of bounds');
        return;
    }
    array[index] = guest;
    res.status(200).send({ saved: true });
};
exports.save_guest = save_guest;
/** Handles request for /load by returning the transcript requested. */
const load_guest = (_req, res) => {
    //just grabing/yoinking array
    res.status(200).send({ array: array });
};
exports.load_guest = load_guest;
/**
 * saves page
 * @param req request to respond to
 * @param res object to send response with
 */
const save_page = (req, res) => {
    const page = req.body.page;
    if (page === undefined) {
        res.status(400).send('required argument "page" was missing');
        return;
    }
    if (page === null) {
        res.status(400).send('page was null');
        return;
    }
    if (!(0, exports.isAPage)(page)) {
        res.status(400).send('value sent is not a page');
        return;
    }
    savedPage = page;
    res.status(200).send({ saved: true });
};
exports.save_page = save_page;
/** Handles request for /load by returning the transcript requested. */
const load_page = (_req, res) => {
    //just grabing/yoinking page
    res.status(200).send({ page: savedPage });
};
exports.load_page = load_page;
/**just for testing, clears map */
const resetTranscriptsForTesting = () => {
    array = new Array;
    savedPage = 'list';
};
exports.resetTranscriptsForTesting = resetTranscriptsForTesting;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/** returns true if unknown is a Guest, only exported for testing purposes */
const isAGuest = (guest) => {
    if (!!guest &&
        typeof guest === "object" &&
        "name" in guest &&
        typeof guest.name === "string" &&
        "guestOf" in guest &&
        !!guest.guestOf &&
        typeof guest.guestOf === "object" &&
        "from" in guest.guestOf &&
        (typeof guest.guestOf.from === 'string' || typeof guest.guestOf.from === 'undefined') &&
        "family" in guest &&
        typeof guest.family === "boolean" &&
        "dietary" in guest &&
        typeof guest.dietary === "string" &&
        "addGuest" in guest &&
        typeof guest.addGuest === "string" &&
        "gGdiet" in guest &&
        typeof guest.gGdiet === "string" &&
        "bringingSomeone" in guest &&
        typeof guest.bringingSomeone === "string") {
        return true;
    }
    else {
        return false;
    }
};
exports.isAGuest = isAGuest;
/** returns true if unknown is a Guest, only exported for testing purposes */
const isAPage = (page) => {
    if (page === 'list' ||
        page === 'add' ||
        (!!page &&
            typeof page === "object" &&
            'kind' in page &&
            page.kind === 'details' &&
            'guest' in page &&
            typeof page.guest === "number")) {
        return true;
    }
    else {
        return false;
    }
};
exports.isAPage = isAPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFRQSxJQUFJLEtBQUssR0FBZ0IsSUFBSSxLQUFjLENBQUM7QUFFNUMsSUFBSSxTQUFTLEdBQVUsTUFBTSxDQUFDO0FBRTlCOzs7O0dBSUc7QUFDSSxNQUFNLFNBQVMsR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ3JFLE1BQU0sS0FBSyxHQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3JDLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRTtRQUN2QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1FBQzlELE9BQU87S0FDUjtJQUNELElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtRQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU87S0FDUjtJQUNDLElBQUcsQ0FBQyxJQUFBLGdCQUFRLEVBQUMsS0FBSyxDQUFDLEVBQUM7UUFDbEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsMkJBQTJCLENBQUMsQ0FBQztRQUNsRCxPQUFPO0tBQ1I7SUFFSCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBakJXLFFBQUEsU0FBUyxhQWlCcEI7QUFDRjs7OztHQUlHO0FBQ0ksTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFnQixFQUFFLEdBQWlCLEVBQVEsRUFBRTtJQUN0RSxNQUFNLEtBQUssR0FBVyxH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