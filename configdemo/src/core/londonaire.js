const lonner=[
    {
        
        logo: '',
        name: 'Sofitel Manila',
        hotelId: '259034ee-3f5c-43b0-9332-dffd85ccba65',
        pms: 'OPERA',
        fetchFromDb: 'no',
        saveToDb: 'no',
        widgetId: 'ddcb45ee-838b-4311-af4b-fa3085903993',
        chatOption: 'MESSAGE_BIRD',
        languages: [{ code: 'en', name: 'English' }],
        orderOfModules: [
          'hotel-info',
          'check-in',
          'offers',
          'services',
          'dining',
          'spa',
          'hotel-compendium',
        ],
        isLogoLoaderActive: false,
        modules: [
          {
            code: 'Preferences',
            name: 'Preferences',
            isActive: true,
            submodules: [
              {
                code: 'Headers',
                isActive: true,
                details: [
                  {
                    title: 'ENHANCE YOUR STAY! SHARE YOUR DESIRES BELOW',
                  },
                ],
              },
            ],
          },
          {
            code: 'Check-In',
            name: 'Check-In',
            isActive: true,
            submodules: [
              {
                name: 'information',
                label: 'Check-In',
                title: 'Please Complete Your Check-In Process',
                isActive: true,
                details: [
                  {
                    name: 'Guest Information',
                    isActive: true,
                    type: 'manual',
                    details: [
                      {
                        name: 'firstName',
                        label: 'First Name',
                        type: 'Text',
                        required: true,
                        isDisabled: true,
                        isActive: true,
                      },
                      {
                        name: 'lastName',
                        label: 'Last Name',
                        type: 'Text',
                        required: true,
                        isDisabled: true,
                        isActive: true,
                      },
                      {
                        name: 'emails',
                        label: 'Email',
                        type: 'Text',
                        required: true,
                        isDisabled: false,
                        isActive: true,
                      },
                      {
                        name: 'phone',
                        label: 'Phone Number',
                        type: 'tel',
                        required: true,
                        isDisabled: false,
                        isActive: true,
                      },
                      {
                        name: 'nationality',
                        label: 'Nationality',
                        type: 'AutoComplete',
                        required: true,
                        isDisabled: false,
                        isActive: true,
                        options: Countries,
                      },
                      {
                        name: 'docType',
                        label: 'Document Type',
                        type: 'AutoComplete',
                        required: true,
                        isDisabled: false,
                        isActive: true,
                        options: [
                          {
                            name: 'Passport',
                            value: 'Passport',
                            code: 'PASSPORT',
                            vendorDocType: 'PASSPORT',
                          },
                          {
                            name: 'Identity Card',
                            value: 'IDC',
                            code: 'IDC',
                            vendorDocType: 'IDENTITY_CARD',
                          },
                          {
                            name: 'Drivers License',
                            value: 'DRL',
                            code: 'DRL',
                            vendorDocType: 'DRIVING_LICENSE',
                          },
                          {
                            name: 'Resident Card',
                            value: 'RES',
                            code: 'RES',
                            vendorDocType: 'RESIDENT_CARD',
                          },
                          {
                            name: 'Green Card',
                            value: 'GRN',
                            code: 'GRN',
                            vendorDocType: 'IDENTITY_CARD',
                          },
                          {
                            name: 'Military ID',
                            value: 'MID',
                            code: 'MID',
                            vendorDocType: 'IDENTITY_CARD',
                          },
                          {
                            name: 'Social Security Card',
                            value: 'SSC',
                            code: 'SSC',
                            vendorDocType: 'IDENTITY_CARD',
                          },
                        ],
                      },
                      {
                        name: 'docNo',
                        label: 'Document Number',
                        type: 'Text',
                        required: true,
                        isDisabled: false,
                        isActive: true,
                      },
                      {
                        name: 'issueCountry',
                        label: 'Document Issuing Authority',
                        type: 'text',
                        required: false,
                        isDisabled: true,
                        isActive: false,
                      },
                    ],
                  },
                  {
                    name: 'Credit Card Info',
                    isActive: true,
                    type: 'NONE',
                    paymentMethod: 'KIOSK',
                    details: [
                      {
                        name: 'cardNumber',
                        label: 'Card Number',
                        type: 'Text',
                        required: true,
                        isDisabled: true,
                        isActive: true,
                      },
                      {
                        name: 'cardHolderName',
                        label: 'Card Holder Name',
                        type: 'Text',
                        required: false,
                        isDisabled: true,
                        isActive: false,
                      },
                      {
                        name: 'cardType',
                        label: 'Card Type',
                        type: 'Text',
                        required: true,
                        isDisabled: true,
                        isActive: true,
                      },
                      {
                        name: 'cardExpiryDate',
                        label: 'Expiry Date',
                        type: 'Text',
                        required: true,
                        isDisabled: true,
                        isActive: true,
                      },
                    ],
                  },
                ],
              },
              {
                name: 'accompanyingGuest',
                label: 'Secondary Guest',
                title: '',
                type: 'manual',
                isActive: true,
                cardIcon: 'guest',
                details: [
                  {
                    name: 'firstName',
                    label: 'First Name',
                    type: 'Text',
                    required: true,
                    isDisabled: true,
                    isActive: true,
                  },
                  {
                    name: 'lastName',
                    label: 'Last Name',
                    type: 'Text',
                    required: true,
                    isDisabled: true,
                    isActive: true,
                  },
                  {
                    name: 'emails',
                    label: 'Email',
                    type: 'Text',
                    required: true,
                    isDisabled: false,
                    isActive: true,
                  },
                  {
                    name: 'phone',
                    label: 'Phone Number',
                    type: 'tel',
                    required: true,
                    isDisabled: false,
                    isActive: true,
                  },
                  {
                    name: 'docType',
                    label: 'Document Type',
                    type: 'AutoComplete',
                    required: true,
                    isDisabled: false,
                    isActive: true,
                  },
                  {
                    name: 'docNo',
                    label: 'Document Number',
                    type: 'Text',
                    required: true,
                    isDisabled: false,
                    isActive: true,
                  },
                  {
                    name: 'condition',
                    label:
                      'I agree to receive an invitation email to validate and sign up for a complimentary ACCOR Membership.',
                    type: 'CheckBox',
                    required: true,
                    isDisabled: false,
                    isActive: false,
                  },
                ],
              },
              {
                name: 'personalisation',
                label: 'Customize My Stay',
                title: 'Check-In',
                type: 'CMS',
                isActive: true,
              },
              {
                name: 'review',
                label: 'Review & Sign',
                title: 'Check-In',
                buttonLabelCheckIn: 'Confirm Check-In',
                // eslint-disable-next-line quotes
                termsAndCondition:
                  'I have read, understood and agree to the Terms & Conditions and Privacy Laws.',
                subTitle:
                  'Please review and confirm the below information to complete the Check-In process',
                type: 'cms',
                isActive: true,
                guestInformationDetails: [
                  {
                    title: 'Guest Information',
                  },
                  {
                    checkIn: 'Check-In',
                    checkOut: 'Checkout',
                  },
                ],
                creditCardDetails: {
                  title: 'Payment Information',
                  details: [
                    {
                      name: 'cardNumber',
                      label: 'Card Number',
                    },
                    {
                      name: 'cardType',
                      label: 'Card Type',
                    },
                    {
                      name: 'cardExpiryDate',
                      label: 'Expiry Date',
                    },
                  ],
                },
                identityVerificationDetails: [
                  {
                    title: 'Identity Verification',
                  },
                  {
                    name: 'docType',
                    cmsName: 'DOCUMENT_TYPE',
                    label: 'Document Type',
                  },
                  {
                    name: 'docNo',
                    cmsName: 'DOCUMENT_NUMBER',
                    label: 'Document Number',
                  },
                ],
                personalizationDetails: [
                  {
                    title: 'Add-Ons',
                  },
                ],
              },
            ],
          },
          {
            code: 'In-Room Dining',
            name: 'In-Room Dining',
            isActive: false,
            type: 'vendor',
            payment: [
              { id: '1', name: 'BILL TO ROOM', message: '' },
              { id: '2', name: 'CASH', message: '' },
              { id: '3', name: 'CARD', message: '' },
            ],
          },
          {
            code: 'Services',
            name: 'Services',
            isActive: true,
            type: 'CMS',
          },
          {
            code: 'view-bill',
            name: 'View Bill',
            isActive: true,
          },
          {
            code: 'checkout',
            name: 'Checkout',
            isActive: true,
          },
          {
            code: 'spa',
            name: 'Spa',
            isActive: true,
            type: 'CMS',
          },
        ],
      }
    ]