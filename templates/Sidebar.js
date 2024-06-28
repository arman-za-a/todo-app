"use client";
import styles from "@/sass/Sidebar.module.scss";
import SidebarItem from "@/components/SidebarItem";
import { SiGnuprivacyguard } from "react-icons/si";
import { FiLogIn } from "react-icons/fi";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
const Sidebar = ({ status }) => {
    const items = [
        ...(status === "unauthed" ? [
            { icon: <SiGnuprivacyguard />, link: { path: "/signup", text: "Signup" } },
            { icon: <FiLogIn />, link: { path: "/signin", text: "Signin" } },
        ] : []),
        ...(status === "authed" ? [
                { icon: <VscListSelection />, link: { path: "/todos", text: "Todos" } },
                { icon: <BiMessageSquareAdd />, link: { path: "/add-todo", text: "Add Todo" } },
                { icon: <RxDashboard />, link: { path: "/profile", text: "Profile" } },
        ] : [])    
    ];
    return (
        <aside className={styles.container}>
            <h2 className={styles.title}>Welcome 👋</h2>
            <ul>
                {items.map((item, index) => <SidebarItem key={index} {...item} />)}
            </ul>
        </aside>
    );
};
export default Sidebar;