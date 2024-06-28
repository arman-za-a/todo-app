"use server";
import { cookies } from "next/headers";
const getCookies = async () => cookies();
export { getCookies };