import React from 'react'
import {bindActionCreators, compose} from 'redux'
import {connect} from "react-redux"
import {wrapper} from '../redux/store'
import {initializeApp, setGlobalError} from '../redux/app-actions'
import {getGlobalError, getInitialized} from '../redux/app-selectors'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout/Layout'
import s from './index.module.sass'




type StateProps = {

}

type MapStateToProps = {
    initialized: boolean
    globalError: string | null
}

type MapDispatchToProps = {
    initializeApp: () => void
    setGlobalError: (error: string) => void
}
const mapStateToProps = (state): MapStateToProps => ({
    initialized: getInitialized(state),
    globalError: getGlobalError(state)
})

const mapDispatchToProps = (dispatch) => {
    return {
        initializeApp: bindActionCreators(initializeApp, dispatch),
        setGlobalError: bindActionCreators(setGlobalError, dispatch),
    }
}

type PropsType = MapStateToProps & MapDispatchToProps



export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    if(store.getState().app.global !== null) {
        store.dispatch(initializeApp())
        store.dispatch(setGlobalError('initialized text'))
    }
})





class Index extends React.PureComponent<PropsType, StateProps> {


    componentDidMount() {
        this.props.setGlobalError('new value')
    }

    render () {

        return (
            <Layout>

                <Head>
                    <title>Index page</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <h1 className="title">Index page</h1>
                    <div>
                        <p onClick={() => initializeApp()}>Initialized: {this.props.initialized ? 'true' : 'false'}</p>
                        <p>Error initializes: {this.props.globalError}</p>
                    </div>

                    <div className={s.links}>
                        <Link href="/posts"><a>Posts</a></Link>
                        <Link href="/posts/1"><a>Posts 1</a></Link>
                    </div>

                    <div>
                        <img className={s.img} src="/bump-image.jpg" alt=""/>
                    </div>


                </main>

            </Layout>
        )
    }
}





export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(Index) as React.ComponentType<any>