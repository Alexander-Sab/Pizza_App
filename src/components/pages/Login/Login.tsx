import { Headling } from '../../Headling/Headling';
import { Button } from '../../Button/Button';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect } from 'react';

import { Input } from '../../Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { login, userActions } from '../../../store/user.slice';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { jwt, loginErrorMessage } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;

		await senLogin(email.value, password.value);
	};

	const senLogin = async (email: string, password: string) => {
		dispatch(login({ email, password }));
	};
	return (
		<div className={styles.login}>
			<Headling>Вход</Headling>
			{loginErrorMessage && (
				<div className={styles.error}>{loginErrorMessage}</div>
			)}
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.field}>
					<label htmlFor="email"> Ваш email</label>
					<Input id="email" name="email" placeholder="email" />
				</div>
				<div className={styles.field}>
					<label htmlFor="password"> Ваш пароль</label>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="пароль"
					/>
				</div>
				<Button appearance="big">вход</Button>
			</form>

			<div className={styles.links}>
				<div>Нет аккаунта?</div>
				<Link to="/auth/register" className={styles.link}>
					Зарегистрироваться
				</Link>
			</div>
		</div>
	);
}
