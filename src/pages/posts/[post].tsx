import Link from 'next/link'
import Layout from '../../components/Layout/Layout'
import {useRouter} from 'next/router'




function Post() {

    const router = useRouter()
    const { post } = router.query

    return (
        <Layout>
            <h1>Post: {post}</h1>
            <h2>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h2>
        </Layout>
    )
}

export default Post