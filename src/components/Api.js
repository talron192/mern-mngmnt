import React from 'react';

import axios from 'axios';

export class Api {

    GetCustomersData() {
        return axios.get('http://localhost:4000/customers/get')
            .then(function (res) {
                console.log('getData', res.data);
                return res.data;

            }).catch(function (error) {
                console.log('error Api', error)
                return [] // Return empty array in case error response.
            });
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
            }
        ]

        return arr;
    }
}



