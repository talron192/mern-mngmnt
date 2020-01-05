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

    GetMortgageAadviceList() {
        let arr = [
            {
                key: 1,
                value: "משכנתא לרכישת דירה למגורים"
            },
            {
                key: 2,
                value: "משכנתא לרכישת דירה למגורים יד ראשונה מקבלן"
            },
            {
                key: 3,
                value: "משכנתא לרכישת דירה להשקעה"
            },
            {
                key: 4,
                value: "משכנתא בקבוצת רכישה"
            },
            {
                key: 5,
                value: "משכנתא לבנייה עצמית"
            },
            {
                key: 6,
                value: "משכנתא לקיבוץ\מושב\הרחבה\נחלה"
            },
            {
                key: 7,
                value: "משכנתא לדירה במחיר למשתכן"
            },
            {
                key: 8,
                value: "משכנתא לדירה במחיר מטרה"
            },
            {
                key: 9,
                value: "מחזור משכנתא"
            },
            {
                key: 10,
                value: "הלוואה לכל מטרה/משכון נכס קיים"
            },
            {
                key: 11,
                value: "משכנתא בקבוצת רכישה"
            },
            {
                key: 12,
                value: "הלוואת גישור"
            },
            {
                key: 13,
                value: "גרירת משכנתא"
            },
            {
                key: 14,
                value: "משכנתא הפוכה"
            },
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

    GetCustomerType() {
        let arr = [
            {
                key:1,
                value:"עצמאי"
            },
            {
                key:2,
                value:"שכיר"
            },
            {
                key:3,
                value:"חברה"
            }
        ]

        return arr;
    }

    GetStatusList() {
        let arr = [
            {
                key:1,
                value:"קבלת מסמכי לקוח"
            },
            {
                key:2,
                value:"חתימה על ייפוי כח ליועץ משכנתאות"
            },
            {
                key:3,
                value:"קבלת אישור עקרוני על ריביות מהבנקים"
            },
            {
                key:4,
                value:"הצגת הנתונים ללקוח"
            },
            {
                key:5,
                value:"חתימות בבנק על לקיחת מחזור משכנתא"
            }
        ]

        return arr;
    }
}



