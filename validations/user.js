const validateEmail = email => /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
const validatePassword = password => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(password);
const validateName = name => !name || /^[A-Z][-,a-z.']+$/.test(name);
const validateUser = ({ email, password, firstname, lastname }) => (
    validateEmail(email) && 
    validatePassword(password) &&
    validateName(firstname) &&
    validateName(lastname)
);
export { validatePassword, validateName };
export default validateUser;