import React, { useState } from "react";
import "./addConfig.scss";

const hotelOptions = [
  "code",
  "name",
  "hotelId",
  "pms",
  "fetchFromDb",
  "PWAEnabled",
  "saveToDb",
  "modules",
  "button_check_in",
  "button_checkout",
  "button_door_key",
  "backgroundType",
  "roomAutoAllocation",
  "details",
  "label",
  "type",
  "validations",
  "isDisabled",
  "isActive",
  "title",
  "documentScanType",
  "faceMatchType",
  "keyCardFaceMatchFlow",
  "limitKeyCardLimit",
  "addGuestMandatory",
  "showDocumentExpiry",
  "totalAddGuestCount",
  "description",
  "submodules",
  "required",
  "isAddCard",
  "pricePerNight",
  "subNote",
  "updates",
  "termsAndCondition",
  "description1",
  "description2",
  "paymentType",
  "keyVerificationFlow",
  "sentInvoice",
  "feedback",
  "faceMatchFlow",
  "feedBackURL1",
  "feedBackURL2",
  "feedBackURL1Label",
  "feedBackURL2Label",
  "paymentSuccessful",
  "module",
  "moduleTitle",
];

const moduleOptions = [
  "pullman-orchard-stage",
  "Pullman Singapore Orchard Stage",
  "989814e5-2fda-4ab8-b795-33f4d76f1866",
  "OPERA",
  "yes",
  false,
  "no",
  "home",
  "Begin your check-in",
  "Checkout",
  "Door Key",
  "mp4",
  "faceScan",
  "bookingId",
  true,
  "confirmationId",
  "Booking ID",
  "Text",
  "required",
  "textField",
  false,
  true,
  "lastname",
  "Last Name",
  "Room Number (In 4 Digits)",
  "stayDetails",
  "checkoutKey",
  "Place Your Key",
  "scanDoc",
  "scan_api",
  "incode",
  "keyCard",
  "cloud_api",
  2,
  "review",
  "Identity Verification",
  false,
  4,
  "accompanyGuest",
  "Accompanying Guest",
  "firstName",
  "First Name",
  "docNumber",
  "Document Number",
  "email",
  "Card Confirmation",
  "OperaTerminal",
  "Incidental amount",
  50,
  "Card Authorization",
  "Card Authorization Successful",
  "Payment Successful",
];

const AddConfig = ({ onDropdownChange }) => {
  const [selected, setSelected] = useState({
    key: "",
    value: "",
  });

  const handleDropdownChange = (dropdown, value) => {
    // Update the selected state
    setSelected((prevState) => ({
      ...prevState,
      [dropdown]: value,
    }));

    // Notify parent component about the change
    if (value) {
      onDropdownChange(
        `${dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}: ${value}`
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Reset the selected state
    setSelected({
      key: "",
      value: "",
    });

    // Notify parent component about the selected options
    Object.entries(selected).forEach(([dropdown, value]) => {
      if (value) {
        onDropdownChange(
          `${dropdown.charAt(0).toUpperCase() + dropdown.slice(1)}: ${value}`
        );
      }
    });
  };

  return (
    <div className="field-modules">
      <h1>Configuration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Key:</label>
          <select
            value={selected.hotel}
            onChange={(event) =>
              handleDropdownChange("hotel", event.target.value)
            }
          >
            <option value="">Select Key</option>
            {hotelOptions.map((hotel) => (
              <option
                key={hotel}
                value={hotel}
                disabled={selected.hotel === hotel}
              >
                {hotel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Values:</label>
          <select
            value={selected.hotel}
            onChange={(event) =>
              handleDropdownChange("hotel", event.target.value)
            }
          >
            <option value="">Select Value</option>
            {moduleOptions.map((hotel) => (
              <option
                key={hotel}
                value={hotel}
                disabled={selected.hotel === hotel}
              >
                {hotel}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default AddConfig;
