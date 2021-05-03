import { useState } from "react";
import { API_BASE } from '../../helpers/index';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

type LoginState = {
    username: string,
    password: string,
}

const LoginForm: React.FC = () => {
    const router = useRouter();
    const [_, setUserData] = useAppContext();
    const [state, setState] = useState<LoginState>({
        username: '',
        password: '',
    });
    const { username, password } = state;
    const change = (evt: React.ChangeEvent) => setState(st => ({
        ...st,
        [(evt.target as HTMLInputElement).name]: (evt.target as HTMLInputElement).value,
    }));
    const reset = () => setState({ username: '', password: '' });
    const submit = (evt: React.FormEvent) => {
        evt.preventDefault();
        fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
                'Accept': 'Application/json',
            },
            body: JSON.stringify(state),
        })
            .then(res => {
                if (res.status !== 200) {
                    console.log('request failed with status ' + res.status);
                    return reset();
                }
                return res.json();
            })
            .then(json => {
                if (json.hasOwnProperty('ok') && json.ok) {
                    window.localStorage.setItem('token', json.token);
                    window.localStorage.setItem('username', json.username);
                    setUserData({
                        isLoggedIn: true,
                        username: json.username,
                    });
                    router.push('/admin');
                } else {
                    console.log('response not ok');
                    reset();
                }
            })
            .catch(err => {
                console.log('error in request', err);
                reset();
            });
    }
    return (
        <>
            <div className="container py-4">
                <form onSubmit={submit}>
                    <div className="form-row">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="username">Username o Email</label>
                                <input 
                                    onChange={change} 
                                    value={username} 
                                    type="text" 
                                    className="form-control" 
                                    name="username" 
                                    id="username" 
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input 
                                    onChange={change} 
                                    value={password} 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="form-control" 
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-group">
                                <button type="submit" className="btn btn-md btn-outline-success">
                                    Entra
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginForm;