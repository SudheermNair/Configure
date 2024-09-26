export const configFields = [
  {
    hotels: [
      {
        name: "Pullman Orchard ",
        hotelId: "989814e5-2fda-4ab8-b795-33f4d76f1866",
        details: [
          {
            name: "cardNumber",
            label: "Card Number",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
          {
            name: "cardHolderName",
            label: "Card Holder Name",
            type: "Text",
            required: false,
            isDisabled: true,
            isActive: false,
          },
          {
            name: "cardType",
            label: "Card Type",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
          {
            name: "cardExpiryDate",
            label: "Expiry Date",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
        ],
      },
      {
        name: "Sofitel Manila",
        hotelId: "259034ee-3f5c-43b0-9332-dffd85ccba65",
        details: [
          {
            name: "cardNumber",
            label: "Card Number",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
          {
            name: "cardHolderName",
            label: "Card Holder Name",
            type: "Text",
            required: false,
            isDisabled: true,
            isActive: false,
          },
          {
            name: "cardType",
            label: "Card Type",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
          {
            name: "cardExpiryDate",
            label: "Expiry Date",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
        ],
      },
      {
        name: "Londoner Leicester Square",
        hotelId: "aa211eb9-110c-47cb-ade4-7db0e6da20b4",
        details: [
          {
            name: "cardNumber",
            label: "Card Number",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
          {
            name: "cardHolderName",
            label: "Card Holder Name",
            type: "Text",
            required: false,
            isDisabled: true,
            isActive: false,
          },
          {
            name: "cardType",
            label: "Card Type",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
          {
            name: "cardExpiryDate",
            label: "Expiry Date",
            type: "Text",
            required: true,
            isDisabled: true,
            isActive: true,
          },
        ],
      },
    ],
    modules: [
      "Home",
      "FaceScan",
      "BookingID",
      "ConfirmationID",
      "CheckoutKey",
      "ScanDoc",
      "KeyCard",
      "Preferences",
      "Check-In",
      "In-Room Dining",
      "Services",
      "Checkout",
    ],
    submodules: [
      "accompanyingGuest",
      "cardPreAuthorize",
      "cardAuthorize",
      "checkIn",
      "signStayInfo",
      "Headers",
    ],
    Keys: [
      {
        code: [
          "pullman-orchard-stage",
          "home",
          "faceScan",
          "bookingId",
          "stayDetails",
          "checkoutKey",
          "scanDoc",
          "keyCard",
          "review",
          "activateOrComplete",
          "cardConformation",
          "rating",
          "emailPopup",
          "checkOut",
          "banner",
          "terms",
        ],
        pms: ["OPERA", "INFOR"],
        fetchFromDb: ["yes", "no"],
        saveToDb: ["yes", "no"],
        name: [
          "Pullman Singapore Orchard Stage",
          "Identity Verification",
          "Card Confirmation",
          "Card Authorization",
          "Review & Sign",
          "Check-in",
          "Stay Information",
          "Guest Information",
          "Credit Card Information",
          "Finish your Check-in",
        ],
        description: [
          "Kindly use your card for payment",
          "Confirm your email ID ",
        ],
        description1: [
          "Key Card Activated",
          "You've Checked-out",
          "How was your stay?",
        ],
        description2: ["Check-in Completed", "How was your stay?"],
        label: [
          "Booking ID",
          "Room Number (In 4 Digits)",
          "Accompanying Guest",
          "First Name",
          "Last Name",
          "Document Number",
          "Email",
          "Payment Successful",
          "Add your e-signature",
        ],
        title: [
          "Place Your Key",
          "Jingle, Shop & Stay",
          "Card Confirmation",
          "Email Invoice",
          "PREAMBLE",
        ],
      },
    ],
  },
];
