const contracts = [
  {
    vehicle_uid: "V001",
    customer_uid: "C001",
    sign_datetime: new Date().toISOString(),
    loc_begin_datetime: "2024-07-28 09:00:00",
    loc_end_datetime: "2024-07-30 17:00:00",
    returning_datetime: null,
    price: 150.0,
  },
  {
    vehicle_uid: "V002",
    customer_uid: "C002",
    sign_datetime: new Date().toISOString(),
    loc_begin_datetime: "2024-07-26 10:00:00",
    loc_end_datetime: "2024-07-31 18:00:00",
    returning_datetime: null,
    price: 250.0,
  },
  {
    vehicle_uid: "V003",
    customer_uid: "C003",
    sign_datetime: new Date().toISOString(),
    loc_begin_datetime: "2024-07-09 12:00:00",
    loc_end_datetime: "2024-07-11 18:00:00",
    returning_datetime: "2024-07-11 18:00:00",
    price: 250.0,
  },
  {
    vehicle_uid: "V004",
    customer_uid: "C004",
    sign_datetime: new Date().toISOString(),
    loc_begin_datetime: "2024-07-13 11:00:00",
    loc_end_datetime: "2024-07-14 17:00:00",
    returning_datetime: "2024-07-14 20:00:00",
    price: 200.0,
  },
  {
    vehicle_uid: "V005",
    customer_uid: "C005",
    sign_datetime: new Date().toISOString(),
    loc_begin_datetime: "2024-07-15 09:00:00",
    loc_end_datetime: "2024-07-16 18:00:00",
    returning_datetime: null,
    price: 150.0,
  },
];

const billings = [
  {
    contract_id: 1,
    amount: 150.0,
  },
  {
    contract_id: 2,
    amount: 200.0,
  },
  {
    contract_id: 3,
    amount: 250.0,
  },
  {
    contract_id: 4,
    amount: 200.0,
  },
  {
    contract_id: 5,
    amount: 50.0,
  },
];

module.exports = { contracts, billings };
