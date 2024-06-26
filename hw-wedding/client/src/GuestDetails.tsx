import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Guest } from './guest';


type DetailsProps = {
  guest: Guest,
  onSaveClick: (guest:Guest,) => void,
  onBackClick: () => void
};

type DetailsState = {
  diet: string,
  //unknown,0,1
  bringingSomeone: 'unknown'|'0'|'1',
  guestName: string,
  gGDiet: string,
  error:string
};


// Shows an individual auction and allows bidding (if ongoing).
export class GuestDetails extends Component<DetailsProps, DetailsState> {

  constructor(props: DetailsProps) {
    super(props);
    this.state = {diet:this.props.guest.dietary,guestName:this.props.guest.addGuest,bringingSomeone:this.props.guest.bringingSomeone,gGDiet:this.props.guest.gGdiet,error: ""};
  }
/*
  componentDidUpdate = (prevProps: DetailsProps): void => {
    if (prevProps !== this.props) {
      // If the user's bid is too small, update it to be valid. In any case,
      // we need to update the time.
      const amount = parseFloat(this.state.amount);
      if (!isNaN(amount) && amount < this.props.auction.maxBid + 1) {
        this.setState({amount: '' + (this.props.auction.maxBid + 1),
                       now: Date.now(), error: ""});
      } else {
        this.setState({now: Date.now(), error: ""});
      }
    }
  };
*/
  render = (): JSX.Element => {
    if(this.state.bringingSomeone!=='1'){
      return (<div>
        <h2>Guest Details</h2>
        <div>{this.renderGuestInfo()}</div>
        <div>
          <label htmlFor="dietary">Dietary Restrictions ('none' if none):</label>
          <br></br>
          <input id="name" type="text" value={this.state.diet}
              onChange={this.doDietChange}></input>
        </div>
        <div>
        <label htmlFor="ag">Additional Guest?:</label>
        <select name="ag" id='ag' onChange={this.doAGChange}value={this.state.bringingSomeone} >
          <option value='undefined'>unknown</option>
        <option value="0">0</option>
  <option value="1">1</option>
  </select>
  </div>
        <button type="button" onClick={this.doSaveClick}>Save</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
        {this.renderError()}
      </div>);
      
    }
    return (<div>
      <h2>Guest Details</h2>
      <div>{this.renderGuestInfo()}</div>
      <div>
        <label htmlFor="dietary">Dietary Restrictions ('none' if none):</label>
        <br></br>
        <input id="diet" type="text" value={this.state.diet}
            onChange={this.doDietChange}></input>
      </div>
      <div>
      <label htmlFor="ag">Additional Guest?:</label>
      <select name="ag" id='ag' onChange={this.doAGChange} value={this.state.bringingSomeone} >
        <option value='undefined'>unknown</option>
      <option value="0">0</option>
<option value="1">1</option>
</select>
</div>
<div>
        <label htmlFor="guestName">Guest Name:</label>
        <input id="guestName" type="text" value={this.state.guestName}
            onChange={this.doGNChange}></input>
      </div>
      <div>
        <label htmlFor="guestDiet">Guest Dietary Restrictions ('none' if none):</label>
        <br></br>
        <input id="guestDiet" type="text" value={this.state.gGDiet}
            onChange={this.doGGDChange}></input>
      </div>
      <button type="button" onClick={this.doSaveClick}>Save</button>
      <button type="button" onClick={this.doBackClick}>Back</button>
      {this.renderError()}
    </div>);
  };

  renderGuestInfo = (): JSX.Element => {
    const guest = this.props.guest;
    if(guest.guestOf.from===undefined){
      throw new Error('guestOf is undefined?!?!?');
    }
    return (
      <div>
        {guest.name}, guest of {guest.guestOf.from}, {guest.family?'family':'not family'}
      </div>);
  };

  renderError = (): JSX.Element => {
    if (this.state.error.length === 0) {
      return <div></div>;
    } else {
      const style = {width: '300px', backgroundColor: 'rgb(246,194,192)',
          border: '1px solid rgb(137,66,61)', borderRadius: '5px', padding: '5px' };
      return (<div style={{marginTop: '15px'}}>
          <span style={style}><b>Error</b>: {this.state.error}</span>
        </div>);
    }
  };

  doDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({diet: evt.target.value, error: ""});
  };

  doGNChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({guestName: evt.target.value, error: ""});
  };
  doGGDChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({gGDiet: evt.target.value, error: ""});
  };
  doSaveClick = (_: MouseEvent<HTMLButtonElement>): void => {
    // Verify that the user entered all required information.
    if (this.state.diet.trim().length === 0 ||
        (this.state.bringingSomeone === '1'&&(this.state.guestName.trim().length === 0||
        this.state.gGDiet.trim().length === 0))) {
      this.setState({error: "a required field is missing."});
      return;
    }
    //starting point
    const updatedGuest:Guest={name:this.props.guest.name,guestOf:this.props.guest.guestOf,family:this.props.guest.family
      ,dietary:this.state.diet,addGuest:this.state.guestName,gGdiet:this.state.gGDiet,bringingSomeone:this.state.bringingSomeone
    };

    this.props.onSaveClick(updatedGuest);
  };

  doAGChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    // Update the time at which we are showing 
    const st:string=evt.target.value;
    if(st!=='unknown'&&st!=='0'&&st!=='1'){
      throw new Error('illegal string in values of select');
    }
    this.setState({bringingSomeone:st});
  };

  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();  // tell the parent to show the full list again
  };
}
