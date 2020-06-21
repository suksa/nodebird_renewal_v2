export const initialState = {
    // 키값 앞자리 대문자? - 시퀄라이즈에서 관계있는 데이터끼리는 대문자로 뿌려서
    mainPosts: [
        {
            id:1,
            User: {
                id: 1,
                nickname: '제로초',
            },
            content: '첫 번째 게시글 #해시태그 #익스프레스',
            Images: [
                {
                    src: 'http://suksas.dothome.co.kr/data/file/gallery/1794362930_nz0NkcMB_79a0023ef250760cc088ad6122b7e878c8f9a11d.gif'
                },
                {
                    src: 'http://suksas.dothome.co.kr/data/editor/2004/1120193a3c0bd208bfaed7a2942e7a27_1586094411_4611.gif'
                },
                {
                    src: 'http://suksas.dothome.co.kr/data/editor/2004/1120193a3c0bd208bfaed7a2942e7a27_1586094301_9426.gif'
                }
            ],
            Comments: [
                {
                    User: {
                        nickname: 'hero',
                    },
                    content: '얼른 사고싶어요~'
                },
                {
                    User: {
                        nickname: 'nero',
                    },
                    content: '우와 개정판이 나왔군요~',
                }
            ],
        }
    ],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
})

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
        id: 1,
        nickname: '제로초',
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer