import styles from "@/sass/SidebarItem.module.scss";
import Link from "next/link";
const SidebarItem = ({ icon, link }) => (
    <li className={styles.container}>
        {icon}
        <Link href={link.path}>{link.text}</Link>
    </li>
);
export default SidebarItem;