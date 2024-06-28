"use client";
import styles from "@/sass/Header.module.scss";
import { FiLogOut } from "react-icons/fi";
import { useSignout } from "@/hooks/auth";
const Header = ({ status }) => {
    const { isLoading, requestSignout } = useSignout();
    return (
        <header className={styles.container}>
            <nav className={styles.navbar}>
                <h1>Todo App</h1>
                {isLoading ? <h2>...</h2> : status === "authed" && (
                    <button className={styles.logoutButton} onClick={requestSignout}>
                        <span>Logout</span>
                        <FiLogOut />
                    </button>
                )}
            </nav>
        </header>
    );
};
export default Header;