import React, { useState, useCallback } from 'react'
import Link from 'next/link'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = ({ setIsLoggedIn }) => {
    const [id, setId] = useState('')
    const [password, setPassword] = useState('')

    // 컴포넌트에 props로 넘겨주는 함수는 useCallback 사용해서 최적화
    const onChangeId = useCallback(e => {
        setId(e.target.value)
    }, [])

    const onChangePassword = useCallback(e => {
        setPassword(e.target.value)
    }, [])

    const onSubmitForm = useCallback(() => {
        setIsLoggedIn(true)
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
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

export default LoginForm