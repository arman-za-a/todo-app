import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
const signinInputs = [
    { name: "email", type: "email", placeholder: "Email" },
    { name: "password", type: "password", placeholder: "Password" }
];
const signupInputs = [
    ...signinInputs,
    { name: "firstname", type: "text", placeholder: "Name" },
    { name: "lastname", type: "text", placeholder: "Last Name" },
];
const profileInputs = [
    { name: "firstname", type: "text", label: "Name" },
    { name: "lastname", type: "text", label: "Last Name" },
    { name: "password", type: "password", label: "Password" }
];
const statusRadios = [
    { value: "todo", icon: <BsAlignStart />, title: "Todo", bg: "bg_todo" },
    { value: "progress", icon: <FiSettings />, title: "In Progress", bg: "bg_progress" },
    { value: "review", icon: <AiOutlineFileSearch />, title: "Review", bg: "bg_review" },
    { value: "done", icon: <MdDoneAll />, title: "Done", bg: "bg_done" },
];
export { signinInputs, signupInputs, profileInputs, statusRadios };