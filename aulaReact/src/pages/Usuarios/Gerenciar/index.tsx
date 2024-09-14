import { useCallback, useEffect, useRef } from "react"
import { verificaTokenExpirado } from "../../../services/token"
import { useNavigate } from "react-router-dom"
import { IToken } from "../../../interfaces/token"
import { LayoutDashboard } from "../../../components/LayoutDashboard"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

interface IForm {
    nome: string
    email: string
    password: string
    permissoes: string
}

export default function GerenciarUsuarios() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<IForm>()

    const refForm = useRef<any>()

    const navigate = useNavigate()

    useEffect(() => {
        let lsToken = localStorage.getItem('americanos.token')

        let token: IToken | null = null

        if (typeof lsToken === 'string') {
            token = JSON.parse(lsToken)
        }

        if (!token || verificaTokenExpirado(token.accessToken)) {
            navigate('/')
        }

    }, [])

    const submitForm: SubmitHandler<IForm> = useCallback((data) => {
        axios.post('http://localhost:3001/users',data)
            .then((reponse) => {
                navigate('/usuarios')
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>

            <LayoutDashboard>
                <h1>Add Usuarios</h1>

                <form className="row g-3 needs-validationn mb-3"
                    noValidate
                    style={{
                        alignItems: 'center'
                    }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        refForm.current.classList.add('was-validated')

                        handleSubmit(submitForm)(event)

                    }}
                    ref={refForm}
                >
                    <div
                        className="col-md-12"
                    >
                        <label htmlFor="nome"
                            className="form-label">
                            Nome
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Depay"
                            id="nome"
                            required
                            {...register('nome',
                                { required: 'Nome é Obrigatório!!' }
                            )}
                        />
                        <div
                            className="invalid-feedback">
                            {errors.nome && errors.nome.message}
                        </div>
                    </div>

                    <div
                        className="col-md-12"
                    >
                        <label htmlFor="email"
                            className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Depay@bestPlayer.com"
                            id="email"
                            required
                            {...register('email',
                                { required: 'email é Obrigatório!!' }
                            )}
                        />
                        <div
                            className="invalid-feedback">
                            {errors.email && errors.email.message}
                        </div>

                    </div>

                    <div
                        className="col-md-12"
                    >
                        <label htmlFor="password"
                            className="form-label">
                            Senha
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Digite sua senha!!"
                            id="password"
                            required
                            {...register('password',
                                { required: 'senha é Obrigatório!!' }
                            )}
                        />
                        <div
                            className="invalid-feedback">
                            {errors.password && errors.password.message}
                        </div>

                    </div>

                    <div
                        className="col-md-12"
                    >
                        <label htmlFor="permissoes"
                            className="form-label">
                            Permissoes
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Depay"
                            id="permissoes"
                            required
                            {...register('permissoes',
                                { required: 'permissoes é Obrigatório!!' }
                            )}
                        />
                        <div
                            className="invalid-feedback">
                            {errors.permissoes && errors.permissoes.message}
                        </div>
                        <div
                            className="col-md-12"
                        >
                            <button
                                type="submit"
                                className="btn btn-success"
                            >
                                Salvar
                            </button>
                        </div>
                    </div>

                </form>

            </LayoutDashboard>
        </>
    )
}