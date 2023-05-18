import c from './styles.module.scss'
import Breadcrumbs from '../breadcrumbs'
import PageHeader from '../pageHeader'
import Container from '../container'
import SidebarNavigation from '../sidebarNavigation'

const DefaultPage = ({title, bread, children}) => {
    return (
        <>
            <Breadcrumbs path={bread}/>
            <PageHeader title={title}/>
            <section className={c.content}>
                <Container>
                    <div className={c.inner}>
                        <div className={c.body}>{children}</div>
                        <div className={c.sidebar}>
                            <SidebarNavigation />
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default DefaultPage