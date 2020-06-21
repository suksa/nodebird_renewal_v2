import React, { useCallback } from 'react'
import Link from 'next/link'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import useInput from '../hooks/useInput'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user'

const LoginForm = () => {
    const { isLoggingIn } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [id, onChangeId] = useInput('')
    const [password, onChangePassword] = useInput('')

    // 컴포넌트에 props로 넘겨주는 함수는 useCallback 사용해서 최적화
    const onSubmitForm = useCallback(() => {
        dispatch(loginRequestAction( id, password ))
    }, [id, password])

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} />
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
                <Button type="primary" htmlType="submit" loading={isLoggingIn}>로그인</Button>
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