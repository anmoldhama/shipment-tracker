import { NextResponse } from "next/server";
import pool from "../../db";
import { json } from "stream/consumers";

export async function POST(request) {
  let payload = await request.json();

  if (!payload.password || !payload.username) {
    return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
  }

  try {
    // 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]
    const query = "SELECT * FROM Users WHERE username = $1 AND password = $2";
    // const values = [payload.email, payload.password];
    const values = [payload.username,payload.password];
    const client = await pool.connect();
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
          result: "Login Successfully",
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