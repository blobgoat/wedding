import React, { Component, ChangeEvent, MouseEvent } from 'react';


export type NewGuestInfo = {
  name: string,
  guestOf: "Molly"|"James"|undefined,
  family:boolean,
  fromAdd:true
};


type AddGuestProps = {
  onAddClick: (info: NewGuestInfo) => void,
  onBackClick: () => void
};

type AddGuestState = {
  name: string,
  guestOf: "Molly"|"James"|undefined,
  family:boolean,
  error: string
};


// Allows the user to create a new auction.
export class AddGuest extends Component<AddGuestProps, AddGuestState> {

  constructor(props: AddGuestProps) {
    super(props);
    this.state = {name: "", guestOf: undefined, family: false,
                  error: ""};
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h2>Add Guest</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={this.state.name}
              onChange={this.doNameChange}></input>
        </div>
        <div>
        <h2>Guest Of:</h2>

<div>
<input type="radio" id="molly" name="from" value="Molly" checked={this.state.guestOf === "Molly"} onChange={this.doGuestOfChange} />
<label htmlFor="molly">Molly</label>
<br></br>
<input type="radio" id="James" name="from" value="James" checked={this.state.guestOf=== "James"} onChange={this.doGuestOfChange} />
<label htmlFor="James">James</label>
   
</div>
</div>

        <div>
        <label htmlFor="fam"></label>
          <input id="fam" type="checkbox"
              onChange={this.doCheckChange} checked={this.state.family}/> Family
        </div>
        <button type="button" onClick={this.doAddClick}>Add</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
        {this.renderError()}
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

  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value, error: ""});
  };

  doGuestOfChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    if(evt.target.value==="Molly"){
    this.setState({guestOf: "Molly", error: ""});}else{
      if(evt.target.value==="James"){
      this.setState({guestOf: "James", error: ""})}else{
        throw new Error('guestOfChange not james or molly?');
      }
    }
  };

  doCheckChange = (_evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({family: !this.state.family, error: ""});
  };


  doAddClick = (_: MouseEvent<HTMLButtonElement>): void => {
    // Verify that the user entered all required information.
    if (this.state.name.trim().length === 0 ||
        this.state.guestOf === undefined) {
      this.setState({error: "a required field is missing."});
      return;
    }


    // hand off props.
    this.props.onAddClick({
        name: this.state.name,
        guestOf: this.state.guestOf,
        family: this.state.family,
        fromAdd:true
      });
  };

  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();  // tell the parent this was clicked
  };
}
