import React, { useCallback } from 'react'
import Link from 'next/link'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user'

const LoginForm = () => {
    const { logInLoading } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')

    // 컴포넌트에 props로 넘겨주는 함수는 useCallback 사용해서 최적화
    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction({ email, password }))
    }, [email, password])

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}
const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px;
`

export default LoginForm