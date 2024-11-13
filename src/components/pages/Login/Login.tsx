import { Headling } from '../../Headling/Headling';
import { Button } from '../../Button/Button';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';
import { Input } from '../../Input/Input';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;

		await senLogin(email.value, password.value);
	};

	const senLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(
				`${PREFIX}/auth/login`,
				{
					email,
					password
				}
			);
			console.log(data);
			localStorage.setItem('jwt', data.access_token);
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				console.error(e);
				setError(e.response?.data.message);
			}
		}
	};
	return (
		<div className={styles.login}>
			<Headling>Вход</Headling>
			{error && <div className={styles.error}>{error}</div>}
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
