import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { serialize } from "cookie";
import { tokenExpiration } from "@/constants/number";
import { getMe } from "@/services/auth";
const hashPassword = async password => await hash(password, 12);
const verifyPassword = async (password, hashedPassword) => await compare(password, hashedPassword);
const generateToken = data => {
    const token = sign(data, process.env.SECRET_KEY, { expiresIn: tokenExpiration });
    return serialize("token", token, { httpOnly: true, path: "/", maxAge: tokenExpiration });
};
const verifyToken = token => {
    try {
        return verify(token, process.env.SECRET_KEY);
    } catch {
        return null;
    };
};
const authenticateUser = async () => {
    const { data, error } = await getMe();
    return { status: error === "unauthorized" ? "unauthed" : data ? "authed" : "", user: data, error };
};
export { hashPassword, verifyPassword, generateToken, verifyToken, authenticateUser };