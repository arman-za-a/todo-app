"use client";
import styles from "@/sass/MethodForm.module.scss";
import Error from "@/components/Error";
import InputField from "@/components/InputField";
import StatusRadio from "@/components/StatusRadio";
const MethodForm = ({ error, form, icon, title, inputs, radios, submitText, isLoading, changeInput, onSubmit }) => (
    <section className={styles.container}>
        {error ? <Error message={error} /> : (
            <form onSubmit={event => {
                event.preventDefault();
                onSubmit();
            }}>
                <h2 className={styles.title}>
                    {icon}
                    <span>{title}</span>
                </h2>
                {inputs.map(input => 
                    <InputField key={input.name} {...input} value={form[input.name]} onChange={changeInput} />
                )}
                {radios.map(radio => 
                    <StatusRadio key={radio.value} {...radio} checked={radio.value === form.status} onChange={changeInput} />
                )}
                <button className={styles.submitButton} disabled={isLoading}>{isLoading ? "..." : submitText}</button>
            </form>
        )}
    </section>
);
export default MethodForm;