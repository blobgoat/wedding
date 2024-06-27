import React, { Component, MouseEvent } from 'react';
import { Guest } from './guest';
import { count, count_fam } from './guest_count';


type ListProps = {
  guests: ReadonlyArray<Guest>,
  onNewClick: () => void,
  onGuestClick: (index: number) => void
};

export type ListState = {
};


// Shows the list of all the auctions.
export class GuestList extends Component<ListProps, ListState> {
//TODO: think about this constructor for a little bit
  constructor(props: ListProps) {
    super(props);
    this.state = {jamesFamilies:0, mollyFamilies:0}
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h2>Guest List</h2>
        <ul>{this.renderGuests()}</ul>
        <h2>Summary:</h2>
        {this.renderSummary()}
        <button type="button" onClick={this.doNewClick}>Add Guest</button>
      </div>);
  };

  renderGuests = (): JSX.Element[] => {
    const guests: JSX.Element[] = [];
    // Inv: guests = LI for each of auctions[0 .. i-1]
    for (let i = 0; i < this.props.guests.length; i++) {
      const guest = this.props.guests[i];
      const whichSide=guest.guestOf;
      if(whichSide.from===undefined){
        throw new Error('from GuestList generation: guestOf made it into the main list');
      }
      
const aGuest:string=(guest.bringingSomeone==='unknown'?'+1?':'+'+guest.bringingSomeone);
      const desc = 
          <span>   Guest of {whichSide.from} {aGuest}</span>;
      guests.push(
        <li key={guest.name}>
          &nbsp;
          <a href="#" onClick={(evt) => this.doGuestClick(evt, i)}>{guest.name}</a>
          {desc}
        </li>);
    }
    return guests;
  };
  renderSummary = (): JSX.Element => {
      const Molly = 
          <span>{count(this.props.guests,"Molly")} guest(s) of Molly {count_fam(this.props.guests,"Molly")}</span>;
          const James=<span>{count(this.props.guests,"James")} guest(s) of James {count_fam(this.props.guests,"James")}</span>;
    return <div>{Molly}<br></br>{James}</div>
  };

  doNewClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onNewClick();  // tell the parent to show the new guests page
  };

  doGuestClick = (evt: MouseEvent<HTMLAnchorElement>, index: number): void => {
    evt.preventDefault();
    this.props.onGuestClick(index);
  };
}
