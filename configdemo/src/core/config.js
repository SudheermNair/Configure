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
    submodules2: [
      "aaa",
      "bbb",
      "ccc",
      "ddd",
      "ee",
     
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
    styles : [
      "--primary-theme-color",
      "--primary-background-color",
      "--primary-icon-color",
      "--primary-border-color",
      "--primary-box-shadow-color",
      "--primary-error-text-color",
      "--primary-disabled-color",
    
      // overlays
      "--primary-overlay-color",
      "--secondary-overlay-color",
    
      // text colors
      "--primary-text-color",
      "--secondary-text-color",
      "--tertiary-text-color",
    
      // drawer colors
      "--primary-drawer-color",
      "--primary-drawer-notch-color",
      "--primary-drawer-top-left-border-radius",
      "--primary-drawer-top-right-border-radius",
      "--primary-drawer-height",
      "--primary-drawer-background-Opacity",
      "--primary-drawer-background-color",
    
      // Iframe drawer colors
      "--primary-iframe-drawer-color",
      "--primary-iframe-drawer-height",
    
      // image transition background color
      "--primary-image-transition-background-color",
    
      // hamburger menu colors
      "--hamburgermenu-drawer-color",
      "--hamburgermenu-text-color",
      "--hamburgermenu-icon-color",
    
      // font-families
      "--primary-font-regular",
      "--primary-font-medium",
      "--primary-font-semibold",
      "--primary-font-bold",
    
      // Optional font-family properties commented out
      // "--primary-font-heading: 'ClanOT News'",
      // "--primary-font-extd-regular: 'ClanOT Extended Book'",
      // "--heading-font-regular: 'Garamond'",
    
      // Optional title and card font properties
      // "--primary-title-font-family: 'ClanOT Extended Book'",
      // "--secondary-title-font-family: 'ClanOT News'",
      // "--primary-indicator-color: #ffffff",
    
      // "--primary-card-title-font-family: 'ClanOT News'",
      // "--primary-card-desc-font-family: 'ClanOT Book'",
      // "--primary-card-cta-font-family: 'ClanOT Extended Medium'",
      // "--primary-card-background-color: #f8f8f8",
      // "--primary-card-border-radius: 0px",
      // "--primary-card-shadow-color: #00000010",
      // "--primary-card-border: none",
    
      // Optional button properties
      // "--primary-button-color: #ffffff",
      // "--primary-button-background-color: #997300",
      // "--primary-button-border-radius: 0px",
      // "--primary-button-font-family: 'ClanOT Extended Book'",
    
      // "--secondary-button-color: #997300",
      // "--secondary-button-background-color: #ffffff",
      // "--secondary-button-border-radius: 0px",
      // "--secondary-button-font-family: 'ClanOT Extended Book'",
    
      // Readmore options
      // "--readmore-text: flex",
      // "--readmore-arrowwithtext: block",
      // "--readmore-arrow: none",
      // "--readmore-arrowhead: none",
      // "--readmore-underline: none",
    
      "--bottom-menu-arrow-color",
      "--primary-order-button-font-family"
    ]
       
  },
];
