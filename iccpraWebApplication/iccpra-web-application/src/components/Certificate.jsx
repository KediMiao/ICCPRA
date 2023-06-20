import React from "react";
import Contacts from "./cprCertificate/contacts";
import "./Certificate.css";
import Avatar from "./cprCertificate/Avatar";
import Card from "./cprCertificate/Card";

function createCard(contact) {
  return (
    <Card
      key={contact.id}
      name={contact.name}
      imgURL={contact.imgURL}
      phone={contact.phone}
      email={contact.email}
    />
  );
}

function cprMainPage() {
  return (
    <div>
      <h1 className="heading">My CPR Certificate</h1>
      <Avatar imgURL="https://media.licdn.com/dms/image/D5603AQHo04PDBGyqkw/profile-displayphoto-shrink_800_800/0/1682575831520?e=1689206400&v=beta&t=Ryc1yuMqCjThq-GoFxggUmXs1VuCyt99kOEI0XzZH4s" />
      {Contacts.map(createCard)}
    </div>
  );
}

export default cprMainPage;
