import axios from '../../node_modules/axios';

export class Api {

    GetCustomersData() {
        return axios.get('http://localhost:4000/customers/get')
            .then(function (res) {
                return res.data;

            }).catch(function (error) {
                return [] // Return empty array in case error response.
            });
    }

    GetEventType() {
        let arr = [
            {
                key: 1,
                value: "שיחת טלפון"
            },
            {
                key: 2,
                value: "פגישה"
            }
        ]
        return arr;
    }
    GetPaidType() {
        let arr = [
            {
                key: 1,
                value: "תעריף שעתי"
            },
            {
                key: 2,
                value: "תשלום קבוע"
            }
        ]
        return arr;
    }
    GetTypeAction() {
        let arr = [
            {
                key: 1,
                value: "ייעוץ משכנתא"
            },
            {
                key: 2,
                value: "ניהול תיקים"
            },
            {
                key: 3,
                value: "ייעוץ משפטי"
            },
            {
                key: 4,
                value: "ייעוץ פיננסי"
            }
        ]
        return arr;
    }

    GetMatiralStatus() {
        let arr = [
            {
                key:1,
                value:"רווק"
            },
            {
                key:2,
                value:"גרוש"
            },
            {
                key:3,
                value:"אלמן"
            },
            {
                key:4,
                value:"נשוי"
            }
        ]

        return arr;
    }

    GetSourceArrival() {
        let arr = [
            {
                key:1,
                value:"חבר"
            },
            {
                key:2,
                value:"משפחה"
            },
            {
                key:3,
                value:"לימודים"
            },
            {
                key:4,
                value:"אחר"
            }
        ]

        return arr;
    }
}



