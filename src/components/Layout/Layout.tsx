import Header from '../Header/Header'
import Footer from '../Footer/Footer'

import s from './Layout.module.sass'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={s.main}>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout