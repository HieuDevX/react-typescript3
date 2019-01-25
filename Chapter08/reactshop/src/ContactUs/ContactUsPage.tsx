import * as React from "react";
import ContactUs from "./ContactUs";
import { IValues, ISubmitResult } from "./Form";
import { resolve } from "dns";

interface IState {
  name: string;
  email: string;
  reason: string;
  notes: string;
}

class ContactUsPage extends React.Component<{}, IState> {
  // public constructor(props: {}) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     name: "",
  //     notes: "",
  //     reason: ""
  //   };
  // }

  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we'll get back to you as soon as we can.
        </p>
        <ContactUs
          onSubmit={this.handleSubmit}
          // name={this.state.name}
          // onNameChange={this.handleNameChange}
          // email={this.state.email}
          // onEmailChange={this.handleEmailChange}
          // reason={this.state.reason}
          // onReasonChange={this.handleReasonChange}
          // notes={this.state.notes}
          // onNotesChange={this.handleNotesChange}
        />
      </div>
    );
  }

  private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    await wait(1000); // simulate asynchronous web API call
    return {
      // errors: {
      //   email: ["Some is wrong with this"]
      // },
      // success: false
      success: true
    };
  };

  // private handleNameChange = (name: string) => {
  //   this.setState({ name });
  // };
  // private handleEmailChange = (email: string) => {
  //   this.setState({ email });
  // };
  // private handleReasonChange = (reason: string) => {
  //   this.setState({ reason });
  // };
  // private handleNotesChange = (notes: string) => {
  //   this.setState({ notes });
  // };
}

export default ContactUsPage;

const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
