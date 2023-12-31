import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function GET() {


  try {
    
    const query = `select * from drivers
	join users on drivers.driverid = users.driverid;`
 
    const client = await pool.connect();
    const result  = await client.query(query);


    if (result.rows.length >= 1) {
      return NextResponse.json(
        {
          data: result.rows,
          result: "drivers Searched Successfully",
          success: true
          },
        {status: 201}
      );


    } else {
      return NextResponse.json({ result: "Invalid username or Password", success: false }, { status: 404 });
    }
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}