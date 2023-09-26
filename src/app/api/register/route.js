import { NextResponse } from "next/server";
import pool from "../../db";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const payload = await request.json();

    const { email, password, username, role } = payload;

    if (!email || !password || !username || !role) {
      return NextResponse.json({ result: "Required field not found", success: false }, { status: 400 });
    }

    const client = await pool.connect();

    // Check if the user already exists
    const userExistsQuery = "SELECT * FROM Users WHERE email = $1";
    const userExistsValues = [email];
    const userExistsResult = await client.query(userExistsQuery, userExistsValues);

    if (userExistsResult.rowCount >= 1) {
      return NextResponse.json({ message: "User with this email already exists", success: false }, { status: 400 });
    }

    let query = "";
    let values = [];

    if (role === 'driver') {
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      const { vehicleNumber, licenseNumber, contactNumber } = payload;
      
      query = `
        WITH inserted_driver AS (
          INSERT INTO Drivers (vehicleNumber, licenseNumber, contactNumber)
          VALUES ($4, $5, $6)
          RETURNING driverid
        )
        INSERT INTO Users (username, email, password, role, driverid)
        SELECT $1, $2, $3, 'driver', inserted_driver.driverid
        FROM inserted_driver`;
      
      values = [username, email, password, vehicleNumber, licenseNumber, contactNumber];
    } else if (role === 'admin') {
      query = `INSERT INTO Users (username, email, password, role) VALUES ($1, $2, $3, 'admin')`;
      // const salt = await bcrypt.genSalt(10);
      // const hashedPassword = await bcrypt.hash(password, salt);
      values = [username, email, password];
    } else {
      return NextResponse.json({ result: "Invalid role", success: false }, { status: 400 });
    }

    const result = await client.query(query, values);

    if (result.rowCount === 1) {
      return NextResponse.json({
        values,
        result: role === 'driver' ? "Driver added successfully" : "Admin registered successfully",
        success: true
      }, { status: 201 });
    } else {
      return NextResponse.json({ result: "Enter correct data", success: false }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ result: "Database error", success: false }, { status: 500 });
  }
}
