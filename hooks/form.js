import { useImmer as useImmerState } from "use-immer";
const useForm = initialForm => {
    const [form, setForm] = useImmerState(initialForm);
    const changeInput = (name, value) => setForm(form => {
        form[name] = value;
    });
    const resetForm = () => setForm(initialForm);
    return { form, changeInput, resetForm };
};
export default useForm;