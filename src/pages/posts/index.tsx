import Link from 'next/link'
import Layout from '../../components/Layout/Layout'




function Posts() {
    return (
        <Layout>
            <h1>Posts</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}

export default Posts