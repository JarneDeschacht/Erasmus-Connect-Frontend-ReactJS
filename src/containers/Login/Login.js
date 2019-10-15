import React from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Login.module.css';

const Login = () => {
    return (
        <div className={classes.Login}>
            <h1>WELCOME BACK, YOUR ERASMUS PARTNERS HAVE BEEN WAITING FOR YOU</h1>
            <form>
                <Input />
                <Input />
                <div>
                    <p className={classes.ForgotPassword}>forgot password?</p>
                    <Button>Sign in</Button>
                </div>
            </form>
        </div>
    );
}

export default Login;