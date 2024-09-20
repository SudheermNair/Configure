export const configFields=[
    {
        hotels:[
            {
                name:'Pullman Orchard Stage',
                hotelId:'989814e5-2fda-4ab8-b795-33f4d76f1866',
            },
            {
                name:"Sofitel Manila",
                hotelId:'259034ee-3f5c-43b0-9332-dffd85ccba65',
            },
            {
                name: 'Londoner Leicester Square',
                hotelId: 'aa211eb9-110c-47cb-ade4-7db0e6da20b4',
            }
        ] ,
        modules:[
            'Home', 'FaceScan','BookingID','ConfirmationID','CheckoutKey','ScanDoc','KeyCard',
        ],
        submodules:[
            'accompanyingGuest', 'cardPreAuthorize','cardAuthorize','checkIn','signStayInfo',
        ],
        Keys:[
            {code:['stage','uat','sofitel-manila'],
                pms:['OPERA','INFOR'],
                fetchFromDb: ['yes','no'],
                saveToDb:['yes','no'],
                
            }

        ]
            
        }
    
]

