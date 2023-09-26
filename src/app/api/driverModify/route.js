import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  let payload = await request.json();

//   if (!payload.password || !payload.username) {
//     return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
//   }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = `SELECT *
    FROM users
    JOIN drivers ON users.driverID = drivers.driverID
    LEFT JOIN shipments ON shipments.assigneddriverid = drivers.driverid;
    `;
    const query2 =`SELECT *
    FROM users
    JOIN drivers ON users.driverID = drivers.driverID
    JOIN shipments ON shipments.assigneddriverid = drivers.driverId
    WHERE drivers.driverID = $1`;
    const values = [payload.driverid];
    // const values = [payload.username,payload.password];
    // console.log(values,'valuesssssssssssssssssssssssssss')
   
    const client = await pool.connect();
    if(!values[0]){
    const result  = await client.query(query);
    // console.log(rows,'rowuiodhuiofhioudhfuiojhf');
    // console.log(rows,'worsssssssssssssssssssss');
    // let arr = JSON.parse(rows)

    // console.log(result.rows,"rowssssssssssarrrr");
    // console.log(result.rows.length,'lengththth');

    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "Driver Search Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "Invalid Data", success: false }, { status: 404 });
    }
}else if(values[0]){
    const result  = await client.query(query2,values);
    // console.log(rows,'rowuiodhuiofhioudhfuiojhf');
    // console.log(rows,'worsssssssssssssssssssss');
    // let arr = JSON.parse(rows)

    // console.log(result.rows,"rowssssssssssarrrr");
    // console.log(result.rows.length,'lengththth');

    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "Specific Driver Search Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "Invalid Data", success: false }, { status: 404 });
    }
}
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}