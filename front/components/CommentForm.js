import React, { useCallback, useEffect } from 'react'
import { Input, Button, Form } from 'antd'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'
import { useSelector, useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../reducers/post'

const CommentForm = ({ post }) => {
    const dispatch = useDispatch()
    const id = useSelector((state) => state.user.me?.id)
    const { addCommentDone } = useSelector((state) => state.post)
    const [commentText, onChangeCommentText, setCommentText] = useInput('')

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('')
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText)
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        })
    }, [commentText])

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0 }}>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }} type="primary" htmlType="submit">삐약</Button>
            </Form.Item>
        </Form>
    )
}

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
}

export default CommentForm
