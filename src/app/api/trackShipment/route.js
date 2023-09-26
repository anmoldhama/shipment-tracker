import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  let data = await request.json();

  // if (!data.shipmentid) {
  //   return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  // }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = `SELECT shipments.*,
    TO_CHAR(shipments.planneddeliverydate, 'YYYY-MM-DD') AS planneddeliverydate_str,
	  TO_CHAR(shipments.actualdeliverydate, 'YYYY-MM-DD') AS actualdeliverydate_str,
    drivers.*
    FROM shipments
    LEFT JOIN drivers
        ON shipments.assigneddriverid = drivers.driverid
    WHERE shipments.shipmentid = $1
       OR (shipments.assigneddriverid IS NULL AND shipments.shipmentid = $1);`;
  //      const query2 = `SELECT 

  //      shipments.*, 
  //      drivers.driverid AS driverid, 
  //      drivers.vehiclenumber AS vehiclenumber, 
  //      drivers.licensenumber AS licensenumber,
  //    drivers.contactnumber AS contactnumber
  //  FROM 
  //      shipments
  //  LEFT JOIN 
  //      drivers ON shipments.assigneddriverid = drivers.driverid
  //  WHERE 
  //      shipments.assigneddriverid IS NOT NULL
   
  //  UNION
   
  //  SELECT 
  //      shipments.*, 
  //      NULL AS driverid, 
  //      NULL AS vehiclenumber, 
  //      NULL AS licensenumber,
  //    NULL AS contactnumber
  //  FROM 
  //      shipments
  //  WHERE 
  //      shipments.assigneddriverid IS NULL;`;
    // const values = [data.email, data.password];
    const query2 = `WITH ShipmentCounts AS (
      SELECT
          COUNT(CASE WHEN shipmentstatus = 'inTransit' THEN 1 END) AS inTransitCount,
          COUNT(CASE WHEN shipmentstatus = 'delivered' THEN 1 END) AS deliveredCount,
          COUNT(CASE WHEN shipmentstatus = 'pending' THEN 1 END) AS pendingCount
      FROM
          shipments
  )
  
  SELECT 
      shipments.*, 
      drivers.driverid AS driverid, 
      drivers.vehiclenumber AS vehiclenumber, 
      drivers.licensenumber AS licensenumber,
      drivers.contactnumber AS contactnumber,
      (SELECT inTransitCount FROM ShipmentCounts) AS inTransitCount,
      (SELECT deliveredCount FROM ShipmentCounts) AS deliveredCount,
      (SELECT pendingCount FROM ShipmentCounts) AS pendingCount
  FROM 
      shipments
  LEFT JOIN 
      drivers ON shipments.assigneddriverid = drivers.driverid
  WHERE 
      shipments.assigneddriverid IS NOT NULL
     
  UNION
  
  SELECT 
      shipments.*, 
      NULL AS driverid, 
      NULL AS vehiclenumber, 
      NULL AS licensenumber,
      NULL AS contactnumber,
      (SELECT inTransitCount FROM ShipmentCounts) AS inTransitCount,
      (SELECT deliveredCount FROM ShipmentCounts) AS deliveredCount,
      (SELECT pendingCount FROM ShipmentCounts) AS pendingCount
  FROM 
      shipments
  WHERE 
      shipments.assigneddriverid IS NULL;
  `;
    const values = [data.shipmentid];
    // console.log(values,'valuesssssssssssssssssssssssssss')
    const client = await pool.connect();
    if(!values[0]){
    const result  = await client.query(query2);
    // console.log(rows,'rowuiodhuiofhioudhfuiojhf');
    // console.log(rows,'worsssssssssssssssssssss');
    // let arr = JSON.parse(rows)

    // console.log(result.rows,"rowssssssssssarrrr");
    // console.log(result.rows.length,'lengththth');

    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "Shipment Searched Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "Invalid Shipment Id", success: false }, { status: 404 });
    }
  }else if(values[0]){
    const result  = await client.query(query, values);
    // console.log(rows,'rowuiodhuiofhioudhfuiojhf');
    // console.log(rows,'worsssssssssssssssssssss');
    // let arr = JSON.parse(rows)

    // console.log(result.rows,"rowssssssssssarrrr");
    // console.log(result.rows.length,'lengththth');

    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "Shipment Searched Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "Invalid Shipment Id", success: false }, { status: 404 });
    }
  }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}