"use client";
import styles from "@/sass/AuthForm.module.scss";
import Error from "@/components/Error";
import Link from "next/link";
const AuthForm = ({ error, title, inputs, question, submitText, authLink, isLoading, onChangeInput, onSubmit }) => (
    <section className={styles.container}>
        {error === "unauthorized" ? (
            <form className={styles.form} onSubmit={event => {
                event.preventDefault();
                onSubmit();
            }}>
                <h3 className={styles.title}>{title}</h3>
                {inputs.map(input => 
                    <input 
                        key={input.name}
                        className={styles.input} 
                        type={input.type} 
                        placeholder={input.placeholder} 
                        onChange={({ target }) => onChangeInput(input.name, target.value)}
                    />
                )}
                <button className={styles.submitButton} disabled={isLoading}>{isLoading ? "..." : submitText}</button>
                <p className={styles.attention}>
                    <span>{question}</span>
                    <Link className={styles.link} href={authLink.path}>{authLink.text}</Link>
                </p>
            </form>
        ) : <Error message={error} />}
    </section>
);
export default AuthForm;