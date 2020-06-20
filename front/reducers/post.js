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
    postAdded: false,
}

const ADD_POST = 'ADD_POST'
export const addPost = {
    type: ADD_POST,
}

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
        case ADD_POST: {
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default reducer