// Copyright 2017 Jon Williams -- See LICENSE
var fs = require('fs');

/**
 * Sends an email with the given JSON-LD semantic markup included.
 * @param {String} name 
 * @param {String} description 
 * @param {Object} ld 
 */
const send = function (name, description, ld) {
    var html = `<html><head><title>${name}</title></head><body>
<script type='application/ld+json'>${JSON.stringify(ld)}</script>
<h1>${name}</h1>
<p>${description}</p>
</body></html>`.replace(/\r?\n|\r/g, "");


    console.log(`\n  //${html}\n  input = "${html.replace(/"/g, "\\\"")}";
  MailApp.sendEmail({to: Session.getActiveUser().getEmail(), subject: 'Semantic Email Tester - ${name}', htmlBody: input});`);
}

console.log(`function sendSemanticEmailTests() {\n  var input;`);

// https://developers.google.com/gmail/markup/reference/one-click-action
send('one-click-action', 'One Click Actions are those little buttons on the GMail that appear directly in the subject line.',
    {
        "@context": "http://schema.org",
        "@type": "EmailMessage",
        "potentialAction": {
            "@type": "ConfirmAction",
            "name": "Approve Expense",
            "handler": {
                "@type": "HttpActionHandler",
                "url": "https://jonathannen.com/semantic-email.html"
            }
        },
        "description": "Approval request for John's $10.13 expense for office supplies"
    }
);

// https://developers.google.com/gmail/markup/reference/article
send('article', 'Includes an Article',
    {
        "@context": "http://schema.org",
        "@type": "Article",
        "name": "NASA's Messenger Probe Comes To Fiery End On Mercury",
        "url": "http://americanlivewire.com/2015-04-29-nasas-messenger-probe-comes-to-fiery-end-on-mercury/",
        "description": "But besides small size and swift speed, little was known about this mysterious planet until (MErcury Surface, Space ENvironment, GEochemistry, and Ranging) spacecraft became the first man-made instrument to orbit Mercury in 2011.",
        "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRaDt8TQrRdsrSt_smjLiXZTIqEHjq0PjjzzuqLMOzPUqFbpeMqHcksY-gVnoc8bPpUSOcCj6aW",
        "publisher": {
            "@type": "Organization",
            "name": "American Live Wire"
        }
    }
);

// https://developers.google.com/gmail/markup/reference/order
send('basic-order', 'Notification of an order',
    {
        "@context": "http://schema.org",
        "@type": "Order",
        "merchant": {
            "@type": "Organization",
            "name": "Amazon.com"
        },
        "orderNumber": "123-4567890-1234567",
        "priceCurrency": "USD",
        "price": "29.99",
        "acceptedOffer": {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Product",
                "name": "Google Chromecast"
            },
            "price": "29.99",
            "priceCurrency": "USD",
            "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": "1"
            }
        }
    }
);

// https://developers.google.com/gmail/markup/reference/order
send('view-order', 'Order with viewing information',
    {
        "@context": "http://schema.org",
        "@type": "Order",
        "merchant": {
            "@type": "Organization",
            "name": "Amazon.com"
        },
        "orderNumber": "123-4567890-1234567",
        "orderStatus": "http://schema.org/OrderProcessing",
        "priceCurrency": "USD",
        "price": "29.99",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "validFrom": "2027-12-07T23:30:00-08:00"
        },
        "acceptedOffer": {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Product",
                "name": "Google Chromecast",
                "sku": "B00DR0PDNE",
                "url": "http://www.amazon.com/Google-Chromecast-Streaming-Media-Player/dp/B00DR0PDNE/",
                "image": "http://ecx.images-amazon.com/images/I/811nvG%2BLgML._SY550_.jpg"
            },
            "price": "29.99",
            "priceCurrency": "USD",
            "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": "1"
            }
        },
        "url": "https://www.amazon.ca/gp/css/summary/edit.html/orderID=123-4567890-1234567",
        "potentialAction": {
            "@type": "ViewAction",
            "url": "https://www.amazon.ca/gp/css/summary/edit.html/orderID=123-4567890-1234567"
        }
    }
);

// https://developers.google.com/gmail/markup/reference/order
send('order-with-billing-details', 'An order with billing details included',
    {
        "@context": "http://schema.org",
        "@type": "Order",
        "merchant": {
            "@type": "Organization",
            "name": "Amazon.com"
        },
        "orderNumber": "123-4567890-1234567",
        "priceCurrency": "USD",
        "price": "539.00",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "validFrom": "2027-12-07T23:30:00-08:00"
        },
        "acceptedOffer": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": "Samsung Chromebook",
                    "sku": "B009LL9VDG",
                    "url": "http://www.amazon.com/Samsung-XE303C12-A01US-Chromebook-Wi-Fi-11-6-Inch/dp/B009LL9VDG/",
                    "image": "http://ecx.images-amazon.com/images/I/81H-DO3qX0L._SX522_.jpg"
                },
                "price": "249.99",
                "priceCurrency": "USD",
                "eligibleQuantity": {
                    "@type": "QuantitativeValue",
                    "value": "2"
                },
                "seller": {
                    "@type": "Organization",
                    "name": "Samsung Marketplace Store"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": "Google Chromecast",
                    "sku": "B00DR0PDNE",
                    "url": "http://www.amazon.com/Google-Chromecast-Streaming-Media-Player/dp/B00DR0PDNE/",
                    "image": "http://ecx.images-amazon.com/images/I/811nvG%2BLgML._SY550_.jpg"
                },
                "price": "29.99",
                "priceCurrency": "USD",
                "eligibleQuantity": {
                    "@type": "QuantitativeValue",
                    "value": "1"
                },
                "seller": {
                    "@type": "Organization",
                    "name": "Google Store @ Amazon"
                }
            }
        ],
        "url": "https://www.amazon.ca/gp/css/summary/edit.html/orderID=123-4567890-1234567",
        "potentialAction": {
            "@type": "ViewAction",
            "url": "https://www.amazon.ca/gp/css/summary/edit.html/orderID=123-4567890-1234567"
        },
        "orderStatus": "http://schema.org/OrderProcessing",
        "paymentMethod": {
            "@type": "PaymentMethod",
            "name": "http://schema.org/CreditCard"
        },
        "paymentMethodId": "**** **** **** 1234",
        "orderDate": "2027-11-07T23:30:00-08:00",
        "isGift": "false",
        "discount": "0.97",
        "discountCurrency": "USD",
        "customer": {
            "@type": "Person",
            "name": "John Smith"
        },
        "billingAddress": {
            "@type": "PostalAddress",
            "name": "Google",
            "streetAddress": "1600 Amphitheatre Pkwy",
            "addressLocality": "Mountain View",
            "addressRegion": "CA",
            "addressCountry": "USA"
        }
    }
);

// https://developers.google.com/gmail/markup/reference/parcel-delivery
send('parcel-delivery', 'Parcel delivery confirmation',
    {
        "@context": "http://schema.org",
        "@type": "ParcelDelivery",
        "deliveryAddress": {
            "@type": "PostalAddress",
            "name": "Pickup Corner",
            "streetAddress": "24 Willie Mays Plaza",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "addressCountry": "US",
            "postalCode": "94107"
        },
        "expectedArrivalUntil": "2027-03-12T12:00:00-08:00",
        "carrier": {
            "@type": "Organization",
            "name": "FedEx"
        },
        "itemShipped": {
            "@type": "Product",
            "name": "Google Chromecast"
        },
        "partOfOrder": {
            "@type": "Order",
            "orderNumber": "176057",
            "merchant": {
                "@type": "Organization",
                "name": "Bob Dole"
            }
        }
    }
)

// https://developers.google.com/gmail/markup/reference/invoice
send('invoice', 'Invoice for payment',
    {
        "@context": "http://schema.org",
        "@type": "Invoice",
        "accountId": "123-456-789",
        "minimumPaymentDue": {
            "@type": "PriceSpecification",
            "price": "$70.00"
        },
        "paymentDue": "2015-11-22T08:00:00+00:00",
        "paymentStatus": "PaymentAutomaticallyApplied",
        "provider": {
            "@type": "Organization",
            "name": "Mountain View Utilities"
        },
        "totalPaymentDue": {
            "@type": "PriceSpecification",
            "price": "$70.00"
        }
    }
);

send('event', 'Event Reservation for Foo Fighters Concert',
    {
        "@context": "http://schema.org",
        "@type": "EventReservation",
        "reservationNumber": "E123456789",
        "reservationStatus": "http://schema.org/Confirmed",
        "underName": {
            "@type": "Person",
            "name": "John Smith"
        },
        "reservationFor": {
            "@type": "Event",
            "name": "Foo Fighters Concert",
            "startDate": "2027-03-06T19:30:00-08:00",
            "location": {
                "@type": "Place",
                "name": "AT&T Park",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "24 Willie Mays Plaza",
                    "addressLocality": "San Francisco",
                    "addressRegion": "CA",
                    "postalCode": "94107",
                    "addressCountry": "US"
                }
            }
        }
    }
);

// https://developers.google.com/gmail/markup/reference/flight-reservation
send('flight', 'Includes an Flight Confirmation',
    {
        "@context": "http://schema.org",
        "@type": "FlightReservation",
        "reservationNumber": "RXJ34P",
        "reservationStatus": "http://schema.org/Confirmed",
        "underName": {
            "@type": "Person",
            "name": "Eva Green"
        },
        "reservationFor": {
            "@type": "Flight",
            "flightNumber": "110",
            "airline": {
                "@type": "Airline",
                "name": "United",
                "iataCode": "UA"
            },
            "departureAirport": {
                "@type": "Airport",
                "name": "San Francisco Airport",
                "iataCode": "SFO"
            },
            "departureTime": "2027-03-04T20:15:00-08:00",
            "arrivalAirport": {
                "@type": "Airport",
                "name": "John F. Kennedy International Airport",
                "iataCode": "JFK"
            },
            "arrivalTime": "2027-03-05T06:30:00-05:00"
        }
    }
);

// https://developers.google.com/gmail/markup/reference/hotel-reservation
send('hotel', 'A Hotel reservation',
{
    "@context": "http://schema.org",
    "@type": "LodgingReservation",
    "reservationNumber": "abc456",
    "reservationStatus": "http://schema.org/Confirmed",
    "underName": {
      "@type": "Person",
      "name": "John Smith"
    },
    "reservationFor": {
      "@type": "LodgingBusiness",
      "name": "Hilton San Francisco Union Square",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "333 O'Farrell St",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94102",
        "addressCountry": "US"
      },
      "telephone": "415-771-1400"
    },
    "checkinDate": "2027-04-11T16:00:00-08:00",
    "checkoutDate": "2027-04-13T11:00:00-08:00"
  }
);

send('rental-car', 'A Rental Car reservation', 
{
    "@context": "http://schema.org",
    "@type": "RentalCarReservation",
    "reservationNumber": "546323",
    "reservationStatus": "http://schema.org/Confirmed",
    "url": "http://carrentals.com/view/546323",
    "underName": {
      "@type": "Person",
      "name": "John Smith",
      "email": "john@mail.com"
    },
    "programMembership": {
      "@type": "ProgramMembership",
      "memberNumber": "1234567",
      "program": "AAA"
    },
    "bookingAgent": {
      "@type": "Organization",
      "name": "Car Rentals Internationaly",
      "url": "http://carrentals.com/"
    },
    "bookingTime": "2027-01-14T13:05:00-05:00",
    "modifiedTime": "2027-03-14T13:05:00-05:00",
    "confirmReservationUrl": "http://carrentals.com/confirm?id=546323",
    "cancelReservationUrl": "http://carrentals.com/cancel?id=546323",
    "checkinUrl": "http://carrentals.com/checkin?id=546323",
    "modifyReservationUrl": "http://carrentals.com/edit?id=546323",
    "potentialAction": [
      {
        "@type": "ConfirmAction",
        "target": "http://carrentals.com/confirm?id=546323"
      },
      {
        "@type": "CancelAction",
        "target": "http://carrentals.com/cancel?id=546323"
      },
      {
        "@type": "EditAction",
        "target": "http://carrentals.com/edit?id=546323"
      },
      {
        "@type": "CheckInAction",
        "target": "http://carrentals.com/checkin?id=546323"
      }
    ],
    "reservationFor": {
      "@type": "RentalCar",
      "name": "Economy Class Car",
      "model": "Civic",
      "brand": {
        "@type": "Brand",
        "name": "Honda"
      },
      "description": "Sedan 4 Door, 5 Seatbelts, Automatic transmission",
      "rentalCompany": {
        "@type": "Organization",
        "name": "Hertz"
      }
    },
    "pickupLocation": {
      "@type": "Place",
      "name": "Hertz San Diego Airport",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1500 Orange Avenue",
        "addressLocality": "San Diego",
        "addressRegion": "CA",
        "postalCode": "94043",
        "addressCountry": "US"
      },
      "telephone": "+1-800-123-4567"
    },
    "pickupTime": "2027-08-05T16:00:00-07:00",
    "dropoffLocation": {
      "@type": "Place",
      "name": "Hertz LAX",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1234 First Street",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "postalCode": "94043",
        "addressCountry": "US"
      },
      "telephone": "+1-800-123-4567"
    },
    "dropoffTime": "2027-08-06T20:00:00-07:00",
    "price": "119.00",
    "priceCurrency": "USD"
  }
);

send('restaurant', 'A Restaurant reservation', 
{
    "@context": "http://schema.org",
    "@type": "FoodEstablishmentReservation",
    "reservationNumber": "OT12345",
    "reservationStatus": "http://schema.org/Confirmed",
    "underName": {
      "@type": "Person",
      "name": "John Smith"
    },
    "reservationFor": {
      "@type": "FoodEstablishment",
      "name": "Wagamama",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Tavistock Street",
        "addressLocality": "London",
        "addressRegion": "Greater London",
        "postalCode": "WC2E 7PG",
        "addressCountry": "United Kingdom"
      }
    },
    "startTime": "2027-04-10T08:00:00+00:00",
    "partySize": "2"
  }
);

console.log("}");
