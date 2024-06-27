"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
describe('routes', function () {
    const mgB0 = { name: 'bill', guestOf: { from: 'Molly' }, family: true, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: '0' };
    //const mgB1:Guest={name:'hein',guestOf:{from:'Molly'},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'1'};
    const mgBU = { name: 'zero', guestOf: { from: 'Molly' }, family: false, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: 'unknown' };
    //const jgB0:Guest={name:'dill',guestOf:{from:'James'},family:true,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'0'};
    const jgB1 = { name: 'sara', guestOf: { from: 'James' }, family: true, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: '1' };
    //const jgBU:Guest={name:'me',guestOf:{from:'James'},family:false,dietary:"none",addGuest:'',gGdiet:"",bringingSomeone:'unknown'};
    it('isAGuest', function () {
        assert.deepStrictEqual((0, routes_1.isAGuest)(mgB0), true);
        assert.deepStrictEqual((0, routes_1.isAGuest)(jgB1), true);
        //not a record
        assert.deepStrictEqual((0, routes_1.isAGuest)(''), false);
        // each with one field left out
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', guestOf: { from: 'James' }, family: false, dietary: "none", addGuest: '', gGdiet: "", }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', guestOf: { from: 'James' }, family: false, dietary: "none", addGuest: '', bringingSomeone: 'unknown' }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', guestOf: { from: 'James' }, family: false, dietary: "none", gGdiet: "", bringingSomeone: 'unknown' }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', guestOf: { from: 'James' }, family: false, addGuest: '', gGdiet: "", bringingSomeone: 'unknown' }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', guestOf: { from: 'James' }, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: 'unknown' }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', guestOf: {}, family: false, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: 'unknown' }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ name: 'me', family: false, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: 'unknown' }), false);
        assert.deepStrictEqual((0, routes_1.isAGuest)({ guestOf: { from: 'James' }, family: false, dietary: "none", addGuest: '', gGdiet: "", bringingSomeone: 'unknown' }), false);
    });
    it('isAPage', function () {
        assert.deepStrictEqual((0, routes_1.isAPage)('list'), true);
        assert.deepStrictEqual((0, routes_1.isAPage)('add'), true);
        assert.deepStrictEqual((0, routes_1.isAPage)({ kind: 'details', guest: 1 }), true);
        assert.deepStrictEqual((0, routes_1.isAPage)({ kind: 'details', guest: 50 }), true);
        //wrong stings
        assert.deepStrictEqual((0, routes_1.isAPage)(''), false);
        assert.deepStrictEqual((0, routes_1.isAPage)('death'), false);
        assert.deepStrictEqual((0, routes_1.isAPage)('daffodil'), false);
        // each with one field left out
        assert.deepStrictEqual((0, routes_1.isAPage)({ kind: 'details', }), false);
        assert.deepStrictEqual((0, routes_1.isAPage)({ guest: 4 }), false);
        assert.deepStrictEqual((0, routes_1.isAPage)({ kind: 'details', guest: 'd' }), false);
        assert.deepStrictEqual((0, routes_1.isAPage)({ kind: 2, guest: 1 }), false);
        assert.deepStrictEqual((0, routes_1.isAPage)({ kind: 'detaiLs', guest: 1 }), false);
    });
    it('add_guest', function () {
        // First branch, straight line code, error case
        const req = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest', body: {} });
        const res = httpMocks.createResponse();
        (0, routes_1.add_guest)(req, res);
        assert.deepStrictEqual(res._getStatusCode(), 400);
        assert.deepStrictEqual(res._getData(), 'required argument "guest" was missing');
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest', body: { content: "some stuff" } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "guest" was missing');
        // Second branch, straight line code, error case
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest', body: { guest: null } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'guest was null');
        const req3 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest', body: { guest: null, content: 'a' } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'guest was null');
        // Third branch, straight line code
        const req4 = httpMocks.createRequest({ method: 'POST', url: '/api/save',
            body: { guest: jgB1 } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { saved: true });
        const req5 = httpMocks.createRequest({ method: 'POST', url: '/api/save',
            body: { guest: mgBU } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { saved: true });
        const req9 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest', body: { guest: 's' } });
        const res9 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req9, res9);
        assert.deepStrictEqual(res9._getStatusCode(), 400);
        assert.deepStrictEqual(res9._getData(), 'value sent is not a guest');
        // Third branch, straight line code
        const req10 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest',
            body: { guest: { kind: 'ddd', number: 1 } } });
        const res10 = httpMocks.createResponse();
        (0, routes_1.add_guest)(req10, res10);
        assert.deepStrictEqual(res10._getStatusCode(), 400);
        assert.deepStrictEqual(res10._getData(), 'value sent is not a guest');
        // Called to clear all saved transcripts created in this test
        //    to not effect future tests
        (0, routes_1.resetTranscriptsForTesting)();
    });
    let testarr = new Array;
    it('load_guest', function () {
        // just need 3 tests for first edge case and other larger tests
        //edge or no data case
        const loadReqE = httpMocks.createRequest({ method: 'GET', url: '/api/load_guest', query: {} });
        const loadResE = httpMocks.createResponse();
        (0, routes_1.load_guest)(loadReqE, loadResE);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadResE._getStatusCode(), 200);
        assert.deepStrictEqual(loadResE._getData(), { array: testarr });
        const saveReq = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest',
            body: { guest: jgB1 } });
        const saveResp = httpMocks.createResponse();
        (0, routes_1.add_guest)(saveReq, saveResp);
        testarr.push(jgB1);
        // Now we can actually (mock a) request to load the transcript
        const loadReq = httpMocks.createRequest({ method: 'GET', url: '/api/load_guest', query: {} });
        const loadRes = httpMocks.createResponse();
        (0, routes_1.load_guest)(loadReq, loadRes);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes._getData(), { array: testarr });
        // second test of successful loading test (using "" edge case)
        // First need to save something in order to load it
        const saveReq2 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest',
            body: { guest: mgB0 } });
        const saveResp2 = httpMocks.createResponse();
        (0, routes_1.add_guest)(saveReq2, saveResp2);
        testarr.push(mgB0);
        // Now we can actually (mock a) request to load the transcript
        const loadReq2 = httpMocks.createRequest({ method: 'GET', url: '/api/load_guest', query: { name: "albert" } });
        const loadRes2 = httpMocks.createResponse();
        (0, routes_1.load_guest)(loadReq2, loadRes2);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes2._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes2._getData(), { array: testarr });
    });
    it('save_page', function () {
        // First branch, straight line code, error case
        const req = httpMocks.createRequest({ method: 'POST', url: '/api/save_page', body: {} });
        const res = httpMocks.createResponse();
        (0, routes_1.save_page)(req, res);
        assert.deepStrictEqual(res._getStatusCode(), 400);
        assert.deepStrictEqual(res._getData(), 'required argument "page" was missing');
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page', body: { content: "some stuff" } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.save_page)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "page" was missing');
        // Second branch, straight line code, error case
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page', body: { page: null } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save_page)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'page was null');
        const req3 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page', body: { page: null, content: 'a' } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.save_page)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'page was null');
        const req9 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page', body: { page: 's' } });
        const res9 = httpMocks.createResponse();
        (0, routes_1.save_page)(req9, res9);
        assert.deepStrictEqual(res9._getStatusCode(), 400);
        assert.deepStrictEqual(res9._getData(), 'value sent is not a page');
        // Third branch, straight line code
        const req10 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { page: { kind: 'ddd', number: 1 } } });
        const res10 = httpMocks.createResponse();
        (0, routes_1.save_page)(req10, res10);
        assert.deepStrictEqual(res10._getStatusCode(), 400);
        assert.deepStrictEqual(res10._getData(), 'value sent is not a page');
        const req4 = httpMocks.createRequest({ method: 'POST', url: '/api/save',
            body: { page: 'list' } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.save_page)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { saved: true });
        const req5 = httpMocks.createRequest({ method: 'POST', url: '/api/save',
            body: { page: 'add' } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.save_page)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { saved: true });
        const req6 = httpMocks.createRequest({ method: 'POST', url: '/api/save',
            body: { page: { kind: 'details', guest: 1 } } });
        const res6 = httpMocks.createResponse();
        (0, routes_1.save_page)(req6, res6);
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { saved: true });
        // Called to clear all saved transcripts created in this test
        //    to not effect future tests
        (0, routes_1.resetTranscriptsForTesting)();
    });
    it('save_guest', function () {
        const saveReq = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest',
            body: { guest: jgB1 } });
        const saveResp = httpMocks.createResponse();
        (0, routes_1.add_guest)(saveReq, saveResp);
        const saveReq1 = httpMocks.createRequest({ method: 'POST', url: '/api/add_guest',
            body: { guest: jgB1 } });
        const saveResp1 = httpMocks.createResponse();
        (0, routes_1.add_guest)(saveReq1, saveResp1);
        //2 in server right now
        // First branch, straight line code, error case
        const req = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { index: 0 } });
        const res = httpMocks.createResponse();
        (0, routes_1.add_guest)(req, res);
        assert.deepStrictEqual(res._getStatusCode(), 400);
        assert.deepStrictEqual(res._getData(), 'required argument "guest" was missing');
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { content: "some stuff" } });
        const res1 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), 'required argument "guest" was missing');
        // Second branch, straight line code, error case
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: null } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), 'guest was null');
        const req3 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: null, content: 'a' } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), 'guest was null');
        const reqb = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: jgB1 } });
        const resb = httpMocks.createResponse();
        (0, routes_1.save_guest)(reqb, resb);
        assert.deepStrictEqual(resb._getStatusCode(), 400);
        assert.deepStrictEqual(resb._getData(), 'required argument "index" was missing');
        const req1b = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: jgB1, content: "some stuff" } });
        const res1b = httpMocks.createResponse();
        (0, routes_1.save_guest)(req1b, res1b);
        assert.deepStrictEqual(res1b._getStatusCode(), 400);
        assert.deepStrictEqual(res1b._getData(), 'required argument "index" was missing');
        // Second branch, straight line code, error case
        const req2b = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: jgB1, index: null } });
        const res2b = httpMocks.createResponse();
        (0, routes_1.save_guest)(req2b, res2b);
        assert.deepStrictEqual(res2b._getStatusCode(), 400);
        assert.deepStrictEqual(res2b._getData(), 'not number');
        const req3b = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: jgB1, index: '', content: 'a' } });
        const res3b = httpMocks.createResponse();
        (0, routes_1.save_guest)(req3b, res3b);
        assert.deepStrictEqual(res3b._getStatusCode(), 400);
        assert.deepStrictEqual(res3b._getData(), 'not number');
        //case when not a guest
        const req9 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: 's', index: 1 } });
        const res9 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req9, res9);
        assert.deepStrictEqual(res9._getStatusCode(), 400);
        assert.deepStrictEqual(res9._getData(), 'value sent is not a guest');
        const req10 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { guest: { kind: 'ddd', number: 1 }, index: 1 } });
        const res10 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req10, res10);
        assert.deepStrictEqual(res10._getStatusCode(), 400);
        assert.deepStrictEqual(res10._getData(), 'value sent is not a guest');
        const req90 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest', body: { guest: jgB1, index: 2 } });
        const res90 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req90, res90);
        assert.deepStrictEqual(res90._getStatusCode(), 400);
        assert.deepStrictEqual(res90._getData(), 'index is out of bounds');
        // Third branch, straight line code
        const req100 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { guest: jgB1, index: 1000 } });
        const res100 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req100, res100);
        assert.deepStrictEqual(res100._getStatusCode(), 400);
        assert.deepStrictEqual(res100._getData(), 'index is out of bounds');
        //cases to see if changes are being made
        const req4 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest',
            body: { guest: mgB0, index: 0 } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { saved: true });
        const reql = httpMocks.createRequest({ method: 'GET', url: '/api/load_guest',
            query: { guest: mgB0, index: 0 } });
        const resl = httpMocks.createResponse();
        (0, routes_1.load_guest)(reql, resl);
        assert.deepStrictEqual(resl._getStatusCode(), 200);
        let arr = new Array;
        arr.push(mgB0);
        arr.push(jgB1);
        assert.deepStrictEqual(resl._getData(), { array: arr });
        arr.pop();
        arr.pop();
        const req5 = httpMocks.createRequest({ method: 'POST', url: '/api/save_guest',
            body: { guest: mgBU, index: 1 } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.save_guest)(req5, res5);
        assert.deepStrictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { saved: true });
        const reql1 = httpMocks.createRequest({ method: 'GET', url: '/api/load_guest',
            query: { guest: mgB0, index: 0 } });
        const resl1 = httpMocks.createResponse();
        (0, routes_1.load_guest)(reql1, resl1);
        assert.deepStrictEqual(resl1._getStatusCode(), 200);
        arr = new Array;
        arr.push(mgB0);
        arr.push(mgBU);
        assert.deepStrictEqual(resl._getData(), { array: arr });
        assert.deepStrictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { saved: true });
        // Called to clear all saved transcripts created in this test
        //    to not effect future tests
        (0, routes_1.resetTranscriptsForTesting)();
    });
    it('load_page', function () {
        // just need 3 tests for first edge case and other larger tests
        //edge or no data case
        const loadReqE = httpMocks.createRequest({ method: 'GET', url: '/api/load_page', query: {} });
        const loadResE = httpMocks.createResponse();
        (0, routes_1.load_page)(loadReqE, loadResE);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadResE._getStatusCode(), 200);
        assert.deepStrictEqual(loadResE._getData(), { page: 'list' });
        const saveReq = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { page: 'add' } });
        const saveResp = httpMocks.createResponse();
        (0, routes_1.save_page)(saveReq, saveResp);
        // Now we can actually (mock a) request to load the transcript
        const loadReq = httpMocks.createRequest({ method: 'GET', url: '/api/load_page', query: {} });
        const loadRes = httpMocks.createResponse();
        (0, routes_1.load_page)(loadReq, loadRes);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes._getData(), { page: 'add' });
        const saveReq1 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { page: 'list' } });
        const saveResp1 = httpMocks.createResponse();
        (0, routes_1.save_page)(saveReq1, saveResp1);
        // Now we can actually (mock a) request to load the transcript
        const loadReq1 = httpMocks.createRequest({ method: 'GET', url: '/api/load_page', query: {} });
        const loadRes1 = httpMocks.createResponse();
        (0, routes_1.load_page)(loadReq1, loadRes1);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes1._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes1._getData(), { page: 'list' });
        // second test of successful loading test (using "" edge case)
        // First need to save something in order to load it
        const saveReq2 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { page: { kind: 'details', guest: 1 } } });
        const saveResp2 = httpMocks.createResponse();
        (0, routes_1.save_page)(saveReq2, saveResp2);
        // Now we can actually (mock a) request to load the transcript
        const loadReq2 = httpMocks.createRequest({ method: 'GET', url: '/api/load_page', query: { name: "albert" } });
        const loadRes2 = httpMocks.createResponse();
        (0, routes_1.load_page)(loadReq2, loadRes2);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes2._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes2._getData(), { page: { kind: 'details', guest: 1 } });
        const saveReq3 = httpMocks.createRequest({ method: 'POST', url: '/api/save_page',
            body: { page: { kind: 'details', guest: 5 } } });
        const saveResp3 = httpMocks.createResponse();
        (0, routes_1.save_page)(saveReq3, saveResp3);
        // Now we can actually (mock a) request to load the transcript
        const loadReq3 = httpMocks.createRequest({ method: 'GET', url: '/api/load_page', query: { name: "albert" } });
        const loadRes3 = httpMocks.createResponse();
        (0, routes_1.load_page)(loadReq3, loadRes3);
        // Validate that both the status code and the output is as expected
        assert.deepStrictEqual(loadRes3._getStatusCode(), 200);
        assert.deepStrictEqual(loadRes3._getData(), { page: { kind: 'details', guest: 5 } });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQWtJO0FBSWxJLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFHakIsTUFBTSxJQUFJLEdBQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxHQUFHLEVBQUMsQ0FBQztJQUN6SCw2SEFBNkg7SUFDN0gsTUFBTSxJQUFJLEdBQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsQ0FBQztJQUNsSSw2SEFBNkg7SUFDN0gsTUFBTSxJQUFJLEdBQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxHQUFHLEVBQUMsQ0FBQztJQUMzSCxrSUFBa0k7SUFDbEksRUFBRSxDQUFDLFVBQVUsRUFBQztRQUNaLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUSxFQUFDLElBQUksQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLGNBQWM7UUFDZCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsaUJBQVEsRUFBQyxFQUFFLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUMzQywrQkFBK0I7UUFDL0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFRLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxHQUFFLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUM5SCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsaUJBQVEsRUFBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdJLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUSxFQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFRLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBQyxlQUFlLEVBQUMsU0FBUyxFQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUN4SSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsaUJBQVEsRUFBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFDLGVBQWUsRUFBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFJLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUSxFQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFRLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsZUFBZSxFQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEksTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFRLEVBQUMsRUFBQyxPQUFPLEVBQUMsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLEVB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