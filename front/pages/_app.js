import PropTypes from 'prop-types'
import 'antd/dist/antd.css'
import Head from 'next/head'

const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>NordBird</title>
            </Head>
            <Component />
        </>
    )
}

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default NodeBird