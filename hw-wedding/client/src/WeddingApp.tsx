import React, { Component} from "react";
//import { isRecord } from './record';
import { GuestList } from './GuestList';
import { AddGuest, NewGuestInfo } from './AddGuest';
import { GuestDetails } from './GuestDetails';
import { Guest } from "./guest";
import { isRecord } from "./record";

// Indicates which page to show. If it is the details page, the argument
// includes the specific guest to show the dietary restrictions of.
type Page = "list" | "add" | {kind: "details", guest: number,}; 
//what is the AppState rn, guests are the thing tied to the server
type WeddingAppState = {page: Page, guests: ReadonlyArray<Guest>};

 
//note Guest has map like properties by being able to access a single "additional guests"

// Whether to show debugging information in the console.
const DEBUG: boolean = true;

 /** Displays the UI of the Wedding rsvp application. */
  export class WeddingApp extends Component<{}, WeddingAppState> {
 
   constructor(props: {}) {
     super(props);
 
     this.state = {page:"list",guests:new Array<Guest>};
  }

   
   render = (): JSX.Element => {
fetch("/api/load_page").then(this.doLoadPageResp)
.catch(() => this.doLoadPageError("failed to connect to server"));
fetch("/api/load_guest").then(this.doLoadGuestResp)
.catch(() => this.doLoadGuestError("failed to connect to server"));

    if (this.state.page === "list") {
      if (DEBUG) console.debug("rendering list page");
      return <GuestList guests={this.state.guests}
                          onNewClick={this.doAddClick}
                          onGuestClick={this.doGuestClick}/>;

    } else if (this.state.page === "add") {
      if (DEBUG) console.debug("rendering add page");
      return <AddGuest onAddClick={this.doFurtherAddClick}
                         onBackClick={this.doBackClick}/>;

    } else {  // details
      const index = this.state.page.guest;
      if(index>=this.state.guests.length){
        return<div>Loading God Damn it...</div>
      }
      const guest:Guest = this.state.guests[index];
      if (DEBUG) console.debug(`rendering details page for "${guest.name}"`);
      return <GuestDetails guest={guest}
                  onSaveClick={(guest:Guest) => this.doSaveClick(index, guest)}
                  onBackClick={this.doBackClick}/>;
    }
     return <div></div>;
   };
   doAddClick = (): void => {
    if (DEBUG) console.debug("set state to add");
    const args2 = {page:'add'};
fetch('/api/save_page',{method: 'POST', body: JSON.stringify(args2),headers: {"Content-Type": "application/json"}})
 .then(this.doSavePageResp)
 .catch(() => this.doSavePageError('failed to connect'));

  };
  doGuestClick = (index: number): void => {

    const guest:Guest = this.state.guests[index];
    if (DEBUG) console.debug(`set state to details for "${guest.name}"`);
    const args2 = {page:{kind: "details", guest:index}};
fetch('/api/save_page',{method: 'POST', body: JSON.stringify(args2),headers: {"Content-Type": "application/json"}})
 .then(this.doSavePageResp)
 .catch(() => this.doSavePageError('failed to connect'));
  };
  doFurtherAddClick = (incom: NewGuestInfo): void => {
    
    const guest:Guest = {name:incom.name,family:incom.family,guestOf:{from:incom.guestOf},dietary:'none',addGuest:'',gGdiet:'',bringingSomeone:'unknown'}
    //if (DEBUG) console.debug(`set state to details for "${guest.name}"`);
    //going to push guest onto stack now
//update array but will be stuck on details so user wont realize invalid data stored here
const index:number=this.state.guests.length;
const args = {guest: guest};
fetch('/api/add_guest',{method: 'POST', body: JSON.stringify(args),headers: {"Content-Type": "application/json"}})
 .then(this.doAddGuestResp)
 .catch(() => this.doAddGuestError('failed to connect'));

 //syncing
 fetch("/api/load_guest").then(this.doLoadGuestResp)
.catch(() => this.doLoadGuestError("failed to connect to server"));

    const args2 = {page:{kind: "details", guest:index}};
fetch('/api/save_page',{method: 'POST', body: JSON.stringify(args2),headers: {"Content-Type": "application/json"}})
 .then(this.doSavePageResp)
 .catch(() => this.doSavePageError('failed to connect'));
  };
  doBackClick = (): void => {
    if (DEBUG) console.debug("set state to list");
    const args2 = {page:"list"};
fetch('/api/save_page',{method: 'POST', body: JSON.stringify(args2),headers: {"Content-Type": "application/json"}})
 .then(this.doSavePageResp)
 .catch(() => this.doSavePageError('failed to connect'));
  };
  doSaveClick = (index:number,guest: Guest,): void => {
    

    
    const args = {guest: guest,index:index};
fetch('/api/save_guest',{method: 'POST', body: JSON.stringify(args),headers: {"Content-Type": "application/json"}})
 .then(this.doAddGuestResp)
 .catch(() => this.doAddGuestError('failed to connect'));

 const args2 = {page:"list"};
fetch('/api/save_page',{method: 'POST', body: JSON.stringify(args2),headers: {"Content-Type": "application/json"}})
 .then(this.doSavePageResp)
 .catch(() => this.doSavePageError('failed to connect'));

  };



  doAddGuestResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doAddGuestJson)
          .catch(() => this.doAddGuestError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doAddGuestError)
          .catch(() => this.doAddGuestError("400 response is not name"));
    } else {
      this.doAddGuestError(`bad status code ${res.status}`);
    }
  };

  doAddGuestJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("200 response is not a record", data);
      return;
    }

    if (!('saved' in data)) {
      console.error("saved not in data", data);
      return;
    }
    if (typeof data.saved !== 'boolean') {
      console.error("saved not boolean", data.saved);
      return;
    }
    
    //do nothing
  }
  doLoadGuestResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doLoadGuestJson)
          .catch(() => this.doLoadGuestError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doLoadGuestError)
          .catch(() => this.doLoadGuestError("400 response is not name"));
    } else {
      this.doLoadGuestError(`bad status code ${res.status}`);
    }
  };
  doLoadGuestJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("200 response is not a record", data);
      return;
    }

    if (typeof data.array !== "object") {
      console.error("'array' field of 200 response is not an object", data.msg);
      return;
    }
    if (data.array === null) {
      console.error("'array' field of 200 response is null", data.msg);
      return;
    }
    if(!Array.isArray(data.array)){
      console.error("'array' field of 200 response is not array", data.msg);
      return;

    }
    
    this.setState({guests: data.array});
  }

  doAddGuestError = (msg: string): void => {
    console.error(`Error fetching /api/add_guest: ${msg}`);
  };
  doSavePageResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doSavePageJson)
          .catch(() => this.doSavePageError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doSavePageError)
          .catch(() => this.doSavePageError("400 response is not name"));
    } else {
      this.doAddGuestError(`bad status code ${res.status}`);
    }
  };

  doSavePageJson = (data: unknown): void => {
    
    if (!isRecord(data)) {
      console.error("200 response is not a record", data);
      return;
    }

    if (!('saved' in data)) {
      console.error("saved not in data", data);
      return;
    }
    if (typeof data.saved !== 'boolean') {
      console.error("saved not boolean", data.saved);
      return;
    }
    
    //do nothing

          

    
  }
  doSavePageError = (msg: string): void => {
    console.error(`Error fetching /api/save_page: ${msg}`);
  };
  doSaveGuestResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doSaveGuestJson)
          .catch(() => this.doSaveGuestError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doSaveGuestError)
          .catch(() => this.doSaveGuestError("400 response is not name"));
    } else {
      this.doAddGuestError(`bad status code ${res.status}`);
    }
  };

  doSaveGuestJson = (data: unknown): void => {
    
    if (!isRecord(data)) {
      console.error("200 response is not a record", data);
      return;
    }

    if (!('saved' in data)) {
      console.error("saved not in data", data);
      return;
    }
    if (typeof data.saved !== 'boolean') {
      console.error("saved not boolean", data.saved);
      return;
    }
    
    //do nothing

          

    
  }
  doSaveGuestError = (msg: string): void => {
    console.error(`Error fetching /api/save_page: ${msg}`);
  };
  doLoadGuestError = (msg: string): void => {
    console.error(`Error fetching /api/load_guest: ${msg}`);
  };
  doLoadPageResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doLoadPageJson)
          .catch(() => this.doLoadPageError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doLoadPageError)
          .catch(() => this.doLoadPageError("400 response is not name"));
    } else {
      this.doLoadGuestError(`bad status code ${res.status}`);
    }
  };

  doLoadPageJson = (data: unknown): void => {
    
    if (!isRecord(data)) {
      console.error("200 response is not a record", data);
      return;
    }
    const page:unknown=data.page;
    
    if (page==='list'||page==='add'){
      this.setState({page: page});
    }else{
      if (!isRecord(page)) {
        console.error("200 response page should be a record", page);
        return;
      }
      const pager:{kind?:unknown,guest?:unknown}=page;
      if((
        pager.kind!==undefined&&
        pager.kind==='details'&&
        pager.guest!==undefined &&
        typeof pager.guest==="number")){
          this.setState({page: {kind:'details',guest:pager.guest}});
        }else{
          console.error("200 response is not a page", pager);
        }

          

    }
  }
  doLoadPageError = (msg: string): void => {
    console.error(`Error fetching /api/save_page: ${msg}`);
  };
 }

 

/*
type WeddingAppState = {
  name: string;  // mirror state of name text box
  msg: string;   // message sent from server
}


/** Displays the UI of the Wedding rsvp application. *//*
export class WeddingApp extends Component<{}, WeddingAppState> {

  constructor(props: {}) {
    super(props);

    this.state = {name: "", msg: ""};
  }
  
  render = (): JSX.Element => {
    return (<div>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="name" id="name" value={this.state.name}
                 onChange={this.doNameChange}></input>
          <button onClick={this.doDummyClick}>Dummy</button>
        </div>
        {this.renderMessage()}
      </div>);
  };

  renderMessage = (): JSX.Element => {
    if (this.state.msg === "") {
      return <div></div>;
    } else {
      return <p>Server says: {this.state.msg}</p>;
    }
  };

  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value, msg: ""});
  };

  doDummyClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    const name = this.state.name.trim();
    if (name.length > 0) {
      const url = "/api/dummy?name=" + encodeURIComponent(name);
      fetch(url).then(this.doDummyResp)
          .catch(() => this.doDummyError("failed to connect to server"));
    }
  };

  doDummyResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doDummyJson)
          .catch(() => this.doDummyError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doDummyError)
          .catch(() => this.doDummyError("400 response is not name"));
    } else {
      this.doDummyError(`bad status code ${res.status}`);
    }
  };

  doDummyJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("200 response is not a record", data);
      return;
    }

    if (typeof data.msg !== "string") {
      console.error("'msg' field of 200 response is not a string", data.msg);
      return;
    }

    this.setState({msg: data.msg});
  }

  doDummyError = (msg: string): void => {
    console.error(`Error fetching /api/dummy: ${msg}`);
  };

}*/
