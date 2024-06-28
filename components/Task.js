"use client";
import "@/sass/helpers.scss";
import styles from "@/sass/Task.module.scss";
import Link from "next/link";
import { RiMastodonLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import { useDeleteTodo, useUpdateTodoStatus } from "@/hooks/todo";
const Task = ({ _id, status, title }) => { 
    const { isLoading: isDelting, requestDeleteTodo } = useDeleteTodo();
    const [{ isLoading: isForwarding }, requestForwardTodo] = useUpdateTodoStatus("next"); 
    const [{ isLoading: isBackwarding }, requestBackwardTodo] = useUpdateTodoStatus("back"); 
    const backButton = (
        <button className={styles.buttonBack} disabled={isBackwarding} onClick={() => requestBackwardTodo(_id)}>
            {isBackwarding ? <span>...</span> : (
                <>
                    <BiLeftArrow />
                    <span>Back</span>
                </>
            )}
        </button>
    );
    const nextButton = (
        <button className={styles.buttonNext} disabled={isForwarding} onClick={() => requestForwardTodo(_id)}>
            {isForwarding ? <span>...</span> : (
                <>
                    <span>Next</span>
                    <BiRightArrow />
                </>
            )}
        </button>
    );
    let actionButtons, actionsStyle = "directionLeft";
    switch (status) {
        case "todo":
            actionButtons = nextButton;
            actionsStyle = "directionRight";
            break;
        case "progress":
        case "review":
            actionButtons = (
                <>
                    {backButton}
                    {nextButton}
                </>
            );
            break;
        case "done":
            actionButtons = backButton;
            break;
    };
    return (
        <div className={styles.container}>
            <div className={styles.actionIcons}>
                {isDelting ? <span>...</span> : <CiTrash className={styles.actionIcon} onClick={() => requestDeleteTodo(_id)} />}
                <Link className={styles.actionIcon} href={`/todos/${_id}`}>
                    <CiEdit />
                </Link>
            </div>
            <div className={`${styles.bar} ${`bg_${status}`}`}></div>
            <div>
                {<RiMastodonLine />}
                <p className={styles.title}>{title}</p>
            </div>
            <div className={`${styles.actions} ${styles[actionsStyle]}`}>
                {actionButtons}
            </div>
        </div>
    );
};
export default Task;